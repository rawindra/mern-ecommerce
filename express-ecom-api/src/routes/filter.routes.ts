import { Router } from 'express';
import FilterController from '../modules/filter/filter.controller';

const router = Router();

router.get("/category/:id", FilterController.filterProductByCategoryId);
router.post("/category/:id/products", FilterController.filterProductByVariants);


export default router