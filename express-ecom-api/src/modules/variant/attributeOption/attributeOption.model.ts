import { Schema, model } from "mongoose";

const AttributeOptionSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export default model('AttributeOption', AttributeOptionSchema);
