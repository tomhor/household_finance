import { logger } from '../utils/logger';
import { MongoDB } from './mongoDB';
import { Account } from '../models/Account';

export class AccountMongoDB {
  private mongoDB: MongoDB;
  private accountsTable = 'accounts';

  constructor() {
    this.mongoDB = new MongoDB();
  }

  async createAccount(account: Account): Promise<Account> {
    try {
      await this.mongoDB.insert(this.accountsTable, account);
      return await this.getAccountByName(account.name);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateChildAccounts(account: Account): Promise<Account> {
    try {
      const query = { name: account.name };
      const update = { $set: { accounts: account.accounts } };
      await this.mongoDB.update(this.accountsTable, query, update);
      return await this.getAccountByName(account.name);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getAccountByName(name: string): Promise<Account> {
    try {
      const query = { name: name };
      const result = await this.mongoDB.get(this.accountsTable, query);
      const account = Account.parseFromDB(result[0]);
      return account;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
