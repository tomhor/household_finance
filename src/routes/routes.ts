import { Router } from 'express';
import { AccountController } from '../controllers/accountController';
const router = Router();

router.post('/account', AccountController.createAccount);

router.get('/account', AccountController.getAccount);

router.post('/child-account', AccountController.createChildAccount);

export default router;
