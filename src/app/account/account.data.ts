import {Balances} from './balances';
import {AccountNumber} from './account.number';

export class AccountData {
  balances: Balances;
  accountNumber: AccountNumber;
  type: string;
  currency: string;
  enabled: boolean;
  name: string;
}
