import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        attributes: [{
            type: Schema.Types.ObjectId,
            ref: 'Attribute',
            default: []
        }]
    },
    { timestamps: true }
);

export default model('Category', CategorySchema);