import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {HttpClient} from '@angular/common/http';
import {Account} from './account';
import {TransactionPage} from './transaction.page';
import {DemoTransaction} from "./transaction";

@Injectable()
export class AccountsAndTransactionsService {

  constructor(private http: HttpClient) {
  }

  public findAccountsForConnection(connectionId: string): Observable<Account[]> {
    return this.http.get<Account[]>(AppSettings.BACKEND_HOSTNAME_API + '/accounts?connectionId=' + connectionId, AppSettings.HTTP_OPTIONS);
  }

  public findAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(AppSettings.BACKEND_HOSTNAME_API + '/accounts/' + accountId, AppSettings.HTTP_OPTIONS);
  }

  public findTransactions(accountId: string, page: string) {
    return this.http.get<TransactionPage>(AppSettings.BACKEND_HOSTNAME_API + '/transactions?accountId=' + accountId + '&page=' + page + '&transactionsPerPage=500', AppSettings.HTTP_OPTIONS);
  }
}
