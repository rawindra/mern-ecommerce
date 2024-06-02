import { Schema, model } from 'mongoose';

const BrandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model('Brand', BrandSchema);