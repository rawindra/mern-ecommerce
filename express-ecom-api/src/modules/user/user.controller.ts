import { NextFunction, Request, Response } from "express";
import HttpException from "../../utils/http.exception";
import UserModel from "./user.model";
import bcrypt from 'bcrypt';

class UserController {
    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await UserModel.find().select('-password').lean()
            res.status(200).json({ users });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            const hashedPwd = await bcrypt.hash(password, 10)

            const userObject = { firstName, lastName, email, "password": hashedPwd }

            const user = await UserModel.create(userObject)

            res.status(201).json({ user })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
}

export default new UserController()