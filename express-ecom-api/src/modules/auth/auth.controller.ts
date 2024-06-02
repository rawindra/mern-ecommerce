import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import HttpException from "../../utils/http.exception";

class AuthController {
    private authService = new AuthService()

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await this.authService.login(email, password);
            // Create secure cookie with refresh token 
            res.cookie('jwt', refreshToken, {
                httpOnly: true, //accessible only by web server 
                secure: true, //https
                sameSite: 'none', //cross-site cookie 
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({ accessToken })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookies = req.cookies
            const accessToken = await this.authService.refresh(cookies)
            res.status(200).json({ accessToken })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    logout = (req: Request, res: Response, next: NextFunction) => {
        try {
            const cookies = req.cookies
            if (!cookies?.jwt) return res.sendStatus(204)
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
            res.json({ message: 'Cookie cleared' })
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
}

export default new AuthController()