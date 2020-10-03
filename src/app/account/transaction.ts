export class Transaction {

  id: string;
  accountId: string;
  created: string;
  updated: string;
  transactionData: TransactionData;
}

class TransactionData {
  amount: Amount;
  description: string;
  zonedDate: string;
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
  endToEndId: string;
  bookingDate: string;
  valueDate: string;
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








