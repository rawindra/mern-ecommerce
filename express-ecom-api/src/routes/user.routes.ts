import { Router } from 'express';
import UserController from '../modules/user/user.controller';
import auth from '../middleware/auth.middleware';
import OrderController from '../modules/order/order.controller';

const router = Router();

router.get("/", auth, UserController.findAll);
router.post("/create", UserController.create);

router.get("/orders", auth, OrderController.findAll);
router.post("/order/create", auth, OrderController.create);
router.get("/order", auth, OrderController.findByUserId);

export default router