import { Router } from 'express';
import { AccountController } from '../controllers/accountController';
const router = Router();

router.post(
  '/account',
  AccountController.createAccount
);

router.get(
  '/account',
  AccountController.getAccount
);

export default router;
