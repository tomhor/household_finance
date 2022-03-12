import { AccountTypes } from './Enums';
import { logger } from '../utils/logger';

export class Account {
  id = 0;
  name = '';
  type: AccountTypes =
    AccountTypes.None;

  constructor(account?: Account) {
    if (account) {
      this.id = account.id;
      this.name = account.name;
      this.type = account.type;
    }
  }

  static parseCreateAccount(
    body: Account
  ): Account {
    const account = new Account();
    account.name = body.name;
    account.type = body.type;
    return account;
  }

  static validateBodyCreateAccount(
    body: Account
  ): void {
    let isValid = true;
    if (!body.name) {
      logger.error('missing body');
      isValid = false;
    }
    if (
      !body.type ||
      !AccountTypes[body.type]
    ) {
      logger.error(`type is invalid.`);
      isValid = false;
    }
    if (!isValid) {
      throw 'invalid params';
    }
    return;
  }
}
