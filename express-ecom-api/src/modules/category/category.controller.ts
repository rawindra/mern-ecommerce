import { NextFunction, Request, Response } from "express";
import CategoryService from "./category.service";
import HttpException from "../../utils/http.exception";

class CategoryController {
    private categoryService = new CategoryService()

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.findAll();
            res.status(200).json({ categories });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;

            const category = await this.categoryService.create(
                name,
            );

            res.status(201).json({ category });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.findById(id);
            res.status(200).json({ category });
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
            const category = await this.categoryService.update(id, name);
            res.status(200).json({ category });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.delete(id);
            res.status(200).json({ category });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    assignVariants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { attributes } = req.body;
            const category = await this.categoryService.assignVariants(id, attributes);
            res.status(200).json({ category });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    getAttributes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.getAttributes(id);
            res.status(200).json({ category });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

}

export default new CategoryController()