import {Account} from './account';

export class AccountHelper {

  public selectDisplayName(account: Account): string {
    if (account.accountData.other.product != null) {
      return account.accountData.other.product;
    }

    if (account.accountData.other.ownerName != null) {
      return account.accountData.other.ownerName;
    }
  }

  public selectBalance(account: Account): string {
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
