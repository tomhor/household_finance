import {AccountTypes} from "./enums";

export class Account {
    id: number = 0;
    name: string = "";
    type: AccountTypes | null = null;

    constructor(account?: Account) {
        if(account){
            this.id = account.id;
            this.name = account.name;
            this.type = account.type;
        }
    }
}
