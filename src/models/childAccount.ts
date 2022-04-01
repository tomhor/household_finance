import { AccountTypes } from './Enums';
import { logger } from '../utils/logger';

export class ChildAccount {
  description: string = '';
  type: AccountTypes = AccountTypes.None;
  balance: number = 0;
  familyName: string = '';

  constructor(childAccount?: ChildAccount) {
    if (childAccount) {
      this.description = childAccount.description;
      this.type = childAccount.type;
      this.balance = childAccount.balance;
      this.familyName = childAccount.familyName;
    }
  }

  static parseCreateChildAccount(body: ChildAccount): ChildAccount {
    const childAccount = new ChildAccount();
    childAccount.description = body.description;
    childAccount.type = body.type;
    childAccount.balance = body.balance;
    childAccount.familyName = body.familyName;
    return childAccount;
  }

  static validateBodyCreateChildAccount(body: any): void {
    let isValid = true;
    if (!body) {
      logger.error('missing body');
      isValid = false;
    }
    if (!body.familyName) {
      logger.error('missing familyName');
      isValid = false;
    }
    if (!body.description) {
      logger.error('missing description');
      isValid = false;
    }
    if (
      !body.type ||
      !AccountTypes[body.type] ||
      (parseInt(AccountTypes[body.type]) != AccountTypes.Saved &&
        parseInt(AccountTypes[body.type]) !== AccountTypes.Bank)
    ) {
      logger.error(`type is invalid.`);
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
      throw 'childAccount not found';
    }
    const childAccount = new ChildAccount();
    childAccount.description = resultElement.name;
    childAccount.type = resultElement.type;
    childAccount.balance = resultElement.balance;
    return childAccount;
  }
}
