import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {HttpClient} from '@angular/common/http';
import {Account} from './account';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  public findAccountsForConnection(connectionId: string): Observable<Account[]> {
    return this.http.get<Account[]>(AppSettings.BACKEND_HOSTNAME_API + '/connections/' + connectionId + '/accounts', AppSettings.HTTP_OPTIONS);
  }
}
