import { Router } from 'express';
import ValidationMiddleware from '../middleware/validation.middleware';
import { create } from '../modules/category/category.validation';
import AttributeOptionController from '../modules/variant/attributeOption/attributeOption.controller';

const router = Router();

router.get("/", AttributeOptionController.findAll);
router.post("/create/", ValidationMiddleware(create), AttributeOptionController.create);
router.get("/:id", AttributeOptionController.findById);
router.put("/update/:id", ValidationMiddleware(create), AttributeOptionController.update);
router.delete("/delete/:id", AttributeOptionController.delete);


export default router