import { NextFunction, Request, Response } from "express";
import AttributeOptionService from "./attributeOption.service";
import HttpException from "../../../utils/http.exception";

class AttributeOptionController {
    private attributeOptionService = new AttributeOptionService()

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const attributeOptions = await this.attributeOptionService.findAll();
            res.status(200).json({ attributeOptions });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;

            const attributeOption = await this.attributeOptionService.create(
                name,
            );

            res.status(201).json({ attributeOption });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const attributeOption = await this.attributeOptionService.findById(id);
            res.status(200).json({ attributeOption });
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
            const attributeOption = await this.attributeOptionService.update(id, name);
            res.status(200).json({ attributeOption });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const attributeOption = await this.attributeOptionService.delete(id);
            res.status(200).json({ attributeOption });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

}

export default new AttributeOptionController()