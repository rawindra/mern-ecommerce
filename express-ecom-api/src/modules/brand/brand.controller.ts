import { NextFunction, Request, Response } from "express";
import BrandService from "./brand.service";
import HttpException from "../../utils/http.exception";

class BrandController {
    private brandService = new BrandService()

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const brands = await this.brandService.findAll();
            res.status(200).json({ brands });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;

            const brand = await this.brandService.create(
                name,
            );

            res.status(201).json({ brand });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const brand = await this.brandService.findById(id);
            res.status(200).json({ brand });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const brand = await this.brandService.update(id, name);
            res.status(200).json({ brand });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const brand = await this.brandService.delete(id);
            res.status(200).json({ brand });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

}

export default new BrandController()