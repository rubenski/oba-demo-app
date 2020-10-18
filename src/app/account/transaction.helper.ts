import {Transaction} from './transaction';

export class TransactionHelper {

  selectDescription(transaction: Transaction): string {
    if (transaction.transactionData.other.counterpartyName) {
      return transaction.transactionData.other.counterpartyName;
    }
    if (transaction.transactionData.other.description) {
      return transaction.transactionData.other.description;
    }
    if (transaction.bankId) {
      return transaction.bankId;
    }
  }
}
