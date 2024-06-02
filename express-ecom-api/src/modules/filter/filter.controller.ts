import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/http.exception";
import ProductModel from "../product/product.model";
import mongoose from "mongoose";

class FilterController {

    filterProductByVariants = async (req: Request, res: Response, next: NextFunction) => {
        try {


            const selectedVariants: { [key: string]: string[] }[] = req.body.variants;

            const matchStages = selectedVariants.map(variant => {
                const orConditions = [];
                for (const key in variant) {
                    if (Object.hasOwnProperty.call(variant, key)) {
                        const values = variant[key];
                        const orCondition = values.map(value => ({ [`variants.attribute.${key}`]: value }));
                        orConditions.push({ $or: orCondition });
                    }
                }
                console.log('Match Stage:', JSON.stringify({ $match: { $and: orConditions } }));
                return { $match: { $and: orConditions } };
            });

            const filteredProducts = await ProductModel.aggregate([...matchStages]).exec();

            res.status(200).json({ filteredProducts });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    filterProductByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const products = await ProductModel.find({ category: id });
            res.status(200).json({ products });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

}

export default new FilterController()