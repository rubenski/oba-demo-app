import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {Message} from './message';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  findUser(message: Message): Observable<any> {
    return this.http.post<any>(AppSettings.BACKEND_HOSTNAME_API + '/log', message, AppSettings.HTTP_OPTIONS);
  }

}
