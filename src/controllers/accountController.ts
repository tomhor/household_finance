import {
  Request,
  Response,
  NextFunction
} from 'express';
import { Account } from '../models/Account';
import { AccountService } from '../services/accountService';
import { logger } from '../utils/logger';

export class AccountController {
  static async createAccount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      Account.validateBodyCreateAccount(
        request.body
      );
      let account =
        Account.parseCreateAccount(
          request.body
        );
      account =
        await AccountService.createAccount(
          account
        );
      response.send({
        account: account
      });
      next();
    } catch (error) {
      logger.error(error);
      response
        .status(500)
        .send(
          'cant create account. please contact support'
        );
    }
  }
}
