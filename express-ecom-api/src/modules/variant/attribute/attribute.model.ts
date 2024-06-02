import { Schema, model } from "mongoose";

const AttributeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    attributeOptions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'AttributeOption'
        }
    ]
});

export default model('Attribute', AttributeSchema);
