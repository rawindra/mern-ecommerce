import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

export default model('Order', OrderSchema);