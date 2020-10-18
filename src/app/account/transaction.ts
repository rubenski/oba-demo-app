export class DemoTransaction {
  transaction: Transaction;
  displayDate: string;
}

export class Transaction {
  id: string;
  accountId: string;
  created: string;
  updated: string;
  transactionData: TransactionData;
  bankId: string;
}

class TransactionData {
  amount: Amount;
  date: string;
  status: string;
  other: Other;


}

class Amount {
  amount: number;
  currency: string;
}

class Other {
  counterpartyName: string;
  counterpartyAccount: AccountReference;
  creditorId: string;
  description: string;
  endToEndId: string;
  bookingDate: string;
  valueDate: string;
  untypedDate: string;
  bankTransactionCode: string;
  checkId: string;
  entryReference: string;
  originalAmount: Amount;
  exchangeRate: ExchangeRate;
  mandateId: string;
  proprietaryBankTransactionCode: string;
  purposeCode: string;
  transactionType: string;
  reasonCode: string;
  remittanceInformationStructured: string;
}

class AccountReference {
  bban: string;
  iban: string;
}

class ExchangeRate {
  currency: string;
  rate: string;
}








