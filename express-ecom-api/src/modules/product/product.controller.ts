import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/http.exception";
import ProductService, { IProduct } from "./product.service";

class ProductController {
    private productService = new ProductService()

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.findAll();
            res.status(200).json({ products });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product: IProduct = {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                productType: req.body.productType,
                price: req.body.price,
                stock: req.body.stock,
                image: req.file && req.file.path.replace(/\\/g, "/")
            }

            const newProduct = await this.productService.create(product, req.elasticClient);

            res.status(201).json({ success: true, product: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ success: false, message: 'Failed to create product' });
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await this.productService.findById(id);
            res.status(200).json({ product });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.productId;

            const product: IProduct = {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                productType: req.body.productType,
                price: req.body.price,
                stock: req.body.stock,
            }

            const image = await this.productService.handleImageUpdate(productId, req);

            const updatedProduct = await this.productService.update(productId, { ...product, image });

            res.status(200).json({ success: true, product: updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ success: false, message: 'Failed to update product' });
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const product = await this.productService.delete(productId);
            res.status(200).json({ product });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    assignVariations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { variants } = req.body;

            let skuAttributes = [];

            for (const key in variants.attribute) {
                if (variants.attribute.hasOwnProperty(key) && variants.attribute[key]) {
                    skuAttributes.push(variants.attribute[key]);
                }
            }

            variants.sku = `${id}-${skuAttributes.join('-')}`;

            const product = await this.productService.assignVariations(id, variants);
            res.status(200).json({ product });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    deleteVariation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, sku } = req.params;

            const product = await this.productService.deleteVariation(id, sku);
            res.status(200).json({ product });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    getAttributes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductAttributes(id);
            res.status(200).json({ product });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
}

export default new ProductController()