import { Request, Response } from "express";
import BrandModel from "./brand.model";
import { Error } from "mongoose";

class BrandService {
    private brand = BrandModel;

    async findAll() {
        try {
            const brands = await this.brand.find();
            return brands
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(name: string) {
        try {
            const brand = await this.brand.create({
                name,
            });
            return brand
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string) {
        try {
            const brand = await this.brand.findById(id);
            return brand
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(id: string, name: string) {
        try {
            const brand = await this.brand.findByIdAndUpdate(id, {
                name
            }, { new: true });
            return brand
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const brand = await this.brand.findByIdAndDelete(id);
            return brand
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}

export default BrandService