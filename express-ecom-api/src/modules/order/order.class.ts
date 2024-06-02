import ProductModel from "../product/product.model";
import UserModel from "../user/user.model";
import OrderModel from "./order.model";

class Order {
    private order = OrderModel;

    async updateUser(userId: any, phoneNumber: any, address: any) {

        const user = await UserModel.findOneAndUpdate(
            { _id: userId },
            { phoneNumber, address },
            { new: true }
        );

        return user;
    }

    async createOrder(userId: any, items: any, total: any) {
        const order = new OrderModel({
            user: userId,
            items,
            total
        });

        order.save();

        return order
    }

    async decreaseVariantProductStock(item: any) {
        const variantProduct = await ProductModel.findOneAndUpdate(
            {
                _id: item.product._id,
                'variants.sku': item.product.variants[0].sku,
                'variants.stock': { $gte: item.product.variants[0].stock }
            },
            {
                $inc: { 'variants.$.stock': -item.quantity }
            },
            {
                new: true,
            }
        );

        return variantProduct
    }

    async decreaseSingleProductStock(item: any) {
        const singleProduct = await ProductModel.findOneAndUpdate(
            {
                _id: item.product._id
            },
            {
                $inc: { stock: -item.quantity }
            },
            {
                new: true,
            }
        );

        return singleProduct
    }
}

export default Order