import { Account } from '../models/Account';
import { logger } from '../utils/logger';
import { AccountMongoDB } from '../providers/accountMongoDB';

export class AccountService {
  private static accountMongoDB: AccountMongoDB = new AccountMongoDB();

  static async createAccount(account: Account): Promise<Account> {
    logger.info('start inserting account to DB', account);
    return await this.accountMongoDB.createAccount(account);
    return account;
  }

  static async getAccountByName(name: string): Promise<Account> {
    logger.info(`start get account by name: ${name}`);
    return await this.accountMongoDB.getAccountByName(name);
  }
}
