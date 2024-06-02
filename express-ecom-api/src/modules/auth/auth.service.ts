import { Error } from "mongoose";
import UserModel from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    private user = UserModel;

    async login(email: string, password: string) {
        try {
            const user = await this.user.findOne({ email }).exec()

            if (!user) throw new Error("User Not Found");

            const match = bcrypt.compare(password, user.password)
            if (!match) throw new Error("Unauthorized");

            const accessToken = jwt.sign(
                {
                    "userId": user?._id
                },
                String(process.env.ACCESS_TOKEN_SECRET),
                { expiresIn: '7d' }
            )

            const refreshToken = jwt.sign(
                { "userId": user?._id },
                String(process.env.REFRESH_TOKEN_SECRET),
                { expiresIn: '7d' }
            )

            return {
                accessToken,
                refreshToken
            }

        } catch (error: any) {
            throw new Error(error.message);
        }

    }

    async refresh(cookies: any) {
        try {
            if (!cookies?.jwt) throw new Error('Unauthorized');

            const refreshToken = cookies.jwt

            jwt.verify(
                refreshToken,
                String(process.env.REFRESH_TOKEN_SECRET),
                async (err: any, decoded: any) => {
                    if (err) throw new Error('Forbidden');

                    const user = await this.user.findOne({ id: decoded.userId }).exec()

                    if (!user) throw new Error('Unauthorized');

                    const accessToken = jwt.sign(
                        {
                            "userId": user?._id
                        },
                        String(process.env.ACCESS_TOKEN_SECRET),
                        { expiresIn: '7d' }
                    )

                    return accessToken
                })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AuthService