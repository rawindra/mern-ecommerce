import { Router } from 'express';
import BrandController from '../modules/brand/brand.controller';
import ValidationMiddleware from '../middleware/validation.middleware';
import { create } from '../modules/brand/brand.validation';

const router = Router();

router.get("/", BrandController.findAll);
router.post("/", ValidationMiddleware(create), BrandController.create);
router.get("/:id", BrandController.findById);
router.put("/:id", ValidationMiddleware(create), BrandController.update);
router.delete("/:id", BrandController.delete);


export default router