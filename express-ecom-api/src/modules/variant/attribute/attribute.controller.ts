import { NextFunction, Request, Response } from "express";
import AttributeService from "./attribute.service";
import HttpException from "../../../utils/http.exception";

class AttributeController {
    private attributeService = new AttributeService()

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const attributes = await this.attributeService.findAll();
            res.status(200).json({ attributes });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body;

            const attribute = await this.attributeService.create(
                name
            );

            res.status(201).json({ attribute });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const attribute = await this.attributeService.findById(id);
            res.status(200).json({ attribute });
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
            const attribute = await this.attributeService.update(id, name);
            res.status(200).json({ attribute });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const attribute = await this.attributeService.delete(id);
            res.status(200).json({ attribute });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

    assignAttributeOptions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { optionIds } = req.body;
            const attribute = await this.attributeService.assignAttributeOptions(id, optionIds);
            res.status(200).json({ attribute });
        } catch (error) {
            if (error instanceof Error) {
                next(new HttpException(400, error.message));
            }
        }
    }

}

export default new AttributeController()