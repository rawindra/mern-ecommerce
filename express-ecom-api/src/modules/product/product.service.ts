import { Error } from "mongoose";
import ProductModel from "./product.model";
import { deleteFile } from "../../utils/fileHandling";
import { Request } from "express";
import { populate } from "dotenv";

export interface IProduct {
    name: string;
    description: string;
    category: string;
    productType: string;
    price?: number;
    stock?: number;
    variants?: any[];
    image?: string | null;
}

class ProductService {
    private product = ProductModel;

    async findAll() {
        try {
            const products = await this.product.find().populate('category');
            return products
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(product: IProduct, client: any) {
        try {
            const newProduct = await this.product.create(product);


            await client.index({
                id: newProduct._id,
                index: 'product',
                body: {
                    name: newProduct.name,
                    description: newProduct.description,
                }
            });

            return newProduct
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string) {
        try {
            const product = await this.product.findById(id);
            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(id: string, product: IProduct) {
        try {
            const updatedProduct = await this.product.findByIdAndUpdate(id, product, { new: true });
            return updatedProduct
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const oldProduct = await this.findById(id);

            if (oldProduct?.image) {
                await deleteFile(oldProduct.image);
            }

            const product = await this.product.findByIdAndDelete(id);
            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async assignVariations(id: string, variants: any[]) {
        try {
            const product = await this.product.findByIdAndUpdate(id, {
                $push: { variants: variants }
            }, { new: true });
            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deleteVariation(id: string, sku: string) {
        try {
            const product = await this.product.findByIdAndUpdate(id, {
                $pull: { variants: { sku } }
            }, { new: true });
            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getProductAttributes(id: string) {
        try {
            const product = await this.product.findById(id).populate({
                path: 'category',
                populate: {
                    path: 'attributes',
                    populate: 'attributeOptions'
                }
            });
            return product
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async handleImageUpdate(productId: string, req: Request) {
        let image = null;

        const oldProduct = await this.findById(productId);

        if (!oldProduct) {
            throw new Error('Product not found');
        }

        if (req.file) {
            image = req.file.path.replace(/\\/g, "/");

            if (oldProduct?.image && oldProduct.image !== image) {
                await deleteFile(oldProduct.image);
            }
        } else {
            image = oldProduct?.image;
        }

        return image;
    }

}

export default ProductService