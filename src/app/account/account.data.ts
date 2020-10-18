import {Balances} from './balances';
import {AccountNumber} from './account.number';
import {Other} from './other';

export class AccountData {
  balances: Balances;
  accountNumber: AccountNumber;
  type: string;
  currency: string;
  other: Other;
}
