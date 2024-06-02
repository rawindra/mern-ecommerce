import { Router } from 'express';
import ValidationMiddleware from '../middleware/validation.middleware';
import CategoryController from '../modules/category/category.controller';
import { create } from '../modules/category/category.validation';

const router = Router();

router.get("/", CategoryController.findAll);
router.post("/create", ValidationMiddleware(create), CategoryController.create);
router.get("/:id", CategoryController.findById);
router.put("/update/:id", ValidationMiddleware(create), CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);
router.post("/assign-variants/:id", CategoryController.assignVariants);
router.get('/:id/attributes', CategoryController.getAttributes);

export default router