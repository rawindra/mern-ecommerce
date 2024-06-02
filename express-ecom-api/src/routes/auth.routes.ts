import { Router } from 'express';
import AuthController from '../modules/auth/auth.controller';

const router = Router();

router.post("/login", AuthController.login);
router.get("/refresh/", AuthController.refresh);
router.post("/logout", AuthController.logout);


export default router