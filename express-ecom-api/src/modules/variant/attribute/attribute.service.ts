import { Error } from "mongoose";
import AttributeModel from "./attribute.model";

class AttributeService {

    private attribute = AttributeModel;

    async findAll() {
        try {
            const attributes = await this.attribute.find().populate('attributeOptions');
            return attributes
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(name: string) {
        try {
            const attribute = await this.attribute.create({ name });
            return attribute
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string) {
        try {
            const attribute = await this.attribute.findById(id).populate('attributeOptions');
            return attribute
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(id: string, name: string) {
        try {
            const attribute = await this.attribute.findByIdAndUpdate(id, { name }, { new: true });
            return attribute
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const attribute = await this.attribute.findByIdAndDelete(id);
            return attribute
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async assignAttributeOptions(id: string, optionIds: string[]) {
        console.log("🚀 ~ AttributeService ~ assignAttributeOptions ~ optionIds:", optionIds)
        console.log("🚀 ~ AttributeService ~ assignAttributeOptions ~ id:", id)
        try {
            const attribute = await this.attribute.findByIdAndUpdate(id, {
                attributeOptions: optionIds
            }, { new: true });
            return attribute
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}

export default AttributeService