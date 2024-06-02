import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import HttpException from "../../utils/http.exception";
import Order from "./order.class";
import OrderModel from "./order.model";

class OrderController {
    private orderClass = new Order();

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await OrderModel.find().populate('items.product');
            res.status(200).json({ orders });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const session = await mongoose.startSession();
        session.withTransaction(async () => {
            try {

                if (!req.user) throw new Error('USER_NOT_FOUND');

                const { phoneNumber, address, items, total } = req.body;

                const order = await this.orderClass.createOrder(req.user?._id, items, total);

                if (!order) throw new Error('ORDER_NOT_CREATED');

                const user = await this.orderClass.updateUser(req.user?._id, phoneNumber, address);

                if (!user) throw new Error('USER_NOT_UPDATED');


                for (const item of items) {
                    if (item.productType === 'variant') {
                        const variantProduct = await this.orderClass.decreaseVariantProductStock(item);

                        if (!variantProduct) throw new Error('VARIANT_PRODUCT_NOT_UPDATED');
                    }

                    if (item.productType === 'single') {
                        const singleProduct = await this.orderClass.decreaseSingleProductStock(item);

                        if (!singleProduct) throw new Error('SINGLE_PRODUCT_NOT_UPDATED');
                    }
                }

                res.status(201).json({ message: 'Order created successfully' });
            } catch (error) {
                await session.abortTransaction();
                if (error instanceof Error) {
                    next(new HttpException(400, error.message));
                }
            }

        });

    }

    findByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await OrderModel.find().populate('items.product');
            res.status(200).json({ orders });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
}

export default new OrderController()