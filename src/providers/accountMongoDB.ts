import { logger } from '../utils/logger';
import { MongoDB } from './mongoDB';
import { Account } from '../models/Account';

export class AccountMongoDB {
  private mongoDB: MongoDB;
  private accountsTable = 'accounts';

  constructor() {
    this.mongoDB = new MongoDB();
  }

  async getAccountByName(
    name: string
  ): Promise<Account> {
    try {
      const query = { name: name };
      const result =
        await this.mongoDB.get(
          this.accountsTable,
          query
        );
      const account =
        Account.parseFromDB(result[0]);
      return account;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
