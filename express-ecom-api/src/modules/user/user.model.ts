import mongoose, { Model, model } from 'mongoose'

const emailRegExp = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const isEmail = {
    validator: (email: string): boolean => emailRegExp.test(email),
    message: 'INVALID_EMAIL',
}

export const emailIsUnique = {
    async validator(email: string): Promise<boolean> {
        const model = this.constructor as Model<any>;
        const user = await model.exists({ email }).exec();
        return user ? false : true;
    },
    message: 'ALREADY_USED_EMAIL',
};


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [isEmail, emailIsUnique],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    }
})

export default model('User', userSchema);
