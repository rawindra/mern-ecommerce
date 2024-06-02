import { Router } from 'express';
import { upload } from '../utils/multer';
import ProductController from '../modules/product/product.controller';

const router = Router();

router.get('/', ProductController.findAll);
router.post('/create', upload.single('image'), ProductController.create);
router.get('/:id', ProductController.findById);

router.put('/update/:productId', upload.single('image'), ProductController.update);
router.delete('/delete/:productId', ProductController.delete);

router.post('/:id/variants/assign', ProductController.assignVariations);
router.delete('/:id/variants/assign/:sku/delete', ProductController.deleteVariation);

router.get('/:id/attributes', ProductController.getAttributes);

export default router