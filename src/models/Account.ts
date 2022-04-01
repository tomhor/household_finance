import { AccountTypes } from './Enums';
import { logger } from '../utils/logger';
import { ChildAccount } from './childAccount';

export class Account {
  _id: string | null = null;
  name: string = '';
  type: AccountTypes = AccountTypes.None;
  accounts: ChildAccount[] = [];

  constructor(account?: Account) {
    if (account) {
      this._id = account._id;
      this.name = account.name;
      this.type = account.type;
      this.accounts = account.accounts;
    }
  }

  static parseCreateAccount(body: Account): Account {
    const account = new Account();
    account.name = body.name;
    account.type = body.type;
    return account;
  }

  static validateBodyCreateAccount(body: Account): void {
    let isValid = true;
    if (!body) {
      logger.error('missing body');
      isValid = false;
    }
    if (!body.name) {
      logger.error('missing name');
      isValid = false;
    }
    if (!body.type || !AccountTypes[body.type]) {
      logger.error(`type is invalid.`);
      isValid = false;
    }
    if (!isValid) {
      throw 'invalid params';
    }
    return;
  }

  static validateBodyGetAccount(body: Account): void {
    let isValid = true;
    if (!body.name) {
      logger.error('missing body');
      isValid = false;
    }
    if (!isValid) {
      throw 'invalid params';
    }
    return;
  }

  static parseFromDB(resultElement: any) {
    if (!resultElement) {
      logger.error('account not found');
      throw 'account not found';
    }
    const account = new Account();
    account._id = resultElement._id;
    account.name = resultElement.name;
    account.type = resultElement.type;
    account.accounts = resultElement.accounts || [];
    return account;
  }
}
