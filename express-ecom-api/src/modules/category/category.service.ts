import { Error } from "mongoose";
import CategoryModel from "./category.model";

class CategoryService {
    private category = CategoryModel;

    async findAll() {
        try {
            const categories = await this.category.find();
            return categories
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(name: string) {
        try {
            const category = await this.category.create({
                name,
            });
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string) {
        try {
            const category = await this.category.findById(id);
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(id: string, name: string) {
        try {
            const category = await this.category.findByIdAndUpdate(id, {
                name
            }, { new: true });
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const category = await this.category.findByIdAndDelete(id);
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async assignVariants(id: string, variants: string[]) {
        try {
            const category = await this.category.findByIdAndUpdate(id, {
                $set:
                {
                    'attributes': variants
                }
            }, { new: true });
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getAttributes(id: string) {
        try {
            const category = await this.category.findById(id).populate({
                path: 'attributes',
                populate: {
                    path: 'attributeOptions'
                }
            });
            return category
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}

export default CategoryService