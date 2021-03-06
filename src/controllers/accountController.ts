import { Request, Response, NextFunction } from 'express';
import { Account } from '../models/Account';
import { AccountService } from '../services/accountService';
import { logger } from '../utils/logger';
import { ChildAccount } from '../models/childAccount';

export class AccountController {
  static async createAccount(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      Account.validateBodyCreateAccount(request.body);
      let account = Account.parseCreateAccount(request.body);
      account = await AccountService.createAccount(account);
      response.send({
        account: account
      });
      next();
    } catch (error) {
      logger.error(error);
      response.status(500).send('cant create account. please contact support');
    }
  }

  static async createChildAccount(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      ChildAccount.validateBodyCreateChildAccount(request.body);
      const childAccount = ChildAccount.parseCreateChildAccount(request.body);
      const account: Account = await AccountService.createChildAccount(childAccount);
      response.send({
        account: account
      });
      next();
    } catch (error) {
      logger.error(error);
      response.status(500).send('cant create account. please contact support');
    }
  }

  static async getAccount(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      Account.validateBodyGetAccount(request.body);
      const name = request.body['name'];
      const account = await AccountService.getAccountByName(name);
      response.send({
        account: account
      });
      next();
    } catch (error) {
      logger.error(error);
      response.status(500).send(error);
    }
  }
}
