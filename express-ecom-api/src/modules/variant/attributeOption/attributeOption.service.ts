import { Error } from "mongoose";
import AttributeOptionModel from "./attributeOption.model";

class AttributeOptionService {
    private attributeOption = AttributeOptionModel;

    async findAll() {
        try {
            const attributeOptions = await this.attributeOption.find();
            return attributeOptions
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(name: string) {
        try {
            const attributeOption = await this.attributeOption.create({
                name,
            });
            return attributeOption
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string) {
        try {
            const attributeOption = await this.attributeOption.findById(id);
            return attributeOption
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(id: string, name: string) {
        try {
            const attributeOption = await this.attributeOption.findByIdAndUpdate(id, {
                name
            }, { new: true });
            return attributeOption
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: string) {
        try {
            const attributeOption = await this.attributeOption.findByIdAndDelete(id);
            return attributeOption
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AttributeOptionService