export class Account {
  id: string;
  returnedInLastDataRefresh: boolean;
  created: string;
  lastUpdated: string;
  accountData: AccountData;


}

class AccountData {
  balances: Balances;
  accountNumber: AccountNumber;
  accountType: string;
  currency: string;
  enabled: boolean;
  name: string;

  public displayName() {
    if (this.name != null) {
      return this.name;
    }

    if (this.accountNumber.iban != null) {
      return this.accountNumber.iban;
    }

    if (this.accountNumber.bban != null) {
      return this.accountNumber.bban;
    }

    if (this.accountNumber.maskedPan != null) {
      return this.accountNumber.maskedPan;
    }
  }
}

class Balances {
  booked: number;
  available: number;
  expected: number;
}

class AccountNumber {
  iban: string;
  bban: string;
  maskedPan: string;
}
