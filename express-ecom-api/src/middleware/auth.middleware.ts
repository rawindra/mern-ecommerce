import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../modules/user/user.model'

const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET),
        async (err, decoded: any) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const user = await UserModel.findById(decoded.userId)
                .exec();
            req.user = user
            next()
        }
    )
}

export default auth;
