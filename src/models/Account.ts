import { AccountTypes } from './Enums';

export class Account {
  id: number;
  name: string;
  type: AccountTypes;

  constructor(account?: Account) {
    if (account) {
      this.id = account.id;
      this.name = account.name;
      this.type = account.type;
    } else {
      this.id = 0;
      this.name = '';
      this.type = AccountTypes.None;
    }
  }
}
