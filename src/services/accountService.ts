import { Account } from '../models/Account';
import { logger } from '../utils/logger';

export class AccountService {
  static async createAccount(
    account: Account
  ): Promise<Account> {
    logger.log(
      'account was insert into the DB',
      account
    );
    return account;
  }
}
