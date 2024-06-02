import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        productType: {
            type: String,
            enum: ['single', 'variant', 'bundle'],
            required: true
        },
        price: {
            type: Number,
        },
        stock: {
            type: Number,
        },
        image: {
            type: String
        },
        variants: [{
            sku: {
                type: String,
                required: true
            },
            attribute: {},
            stock: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
            },
            minPrice: {
                type: Number
            },
            maxPrice: {
                type: Number
            },
        }],
    },
    { timestamps: true }
);


const ProductModel = model('Product', ProductSchema);

export default ProductModel 