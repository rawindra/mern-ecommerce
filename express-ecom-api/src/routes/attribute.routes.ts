import { Router } from 'express';
import ValidationMiddleware from '../middleware/validation.middleware';
import AttributeController from '../modules/variant/attribute/attribute.controller';
import { create } from '../modules/variant/attribute/attribute.validation';

const router = Router();

router.get("/", AttributeController.findAll);
router.post("/create/", ValidationMiddleware(create), AttributeController.create);
router.get("/:id", AttributeController.findById);
router.put("/update/:id", ValidationMiddleware(create), AttributeController.update);
router.delete("/delete/:id", AttributeController.delete);
router.post("/:id/attribute-options/assign", AttributeController.assignAttributeOptions);


export default router