import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {Connection} from './connection';
import {CreateConnectionRequest} from './create.connection.request';

@Injectable()
export class ConnectionService {

  constructor(private http: HttpClient) {
  }

  createConnection(stateId: string): Observable<Connection> {
    return this.http.post<Connection>(AppSettings.BACKEND_HOSTNAME_API + '/connections',
      new CreateConnectionRequest(stateId), AppSettings.HTTP_OPTIONS);
  }
}
