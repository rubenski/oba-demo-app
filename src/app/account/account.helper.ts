import {Account} from './account';

export class AccountHelper {


  public selectDisplayName(account: Account): string {
    if (account.accountData.name != null) {
      return account.accountData.name;
    }

    if (account.accountData.accountNumber.iban) {
      return account.accountData.accountNumber.iban;
    }
  }

  public selectBalance(account: Account): string {
    console.log('poep');
    if (account.accountData.balances.booked != null) {
      return account.accountData.balances.booked;
    }
    if (account.accountData.balances.available != null) {
      return account.accountData.balances.available;
    }
    if (account.accountData.balances.expected != null) {
      return account.accountData.balances.expected;
    }
  }
}
