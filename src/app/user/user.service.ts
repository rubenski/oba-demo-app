import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user';
import {AppSettings} from '../app.settings';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  findUser(): Observable<User> {
    return this.http.get<User>(AppSettings.BACKEND_HOSTNAME_API + '/users', AppSettings.HTTP_OPTIONS);
  }

  createUser(): Observable<User> {
    console.log('BLABLABLA');
    return this.http.post<User>(AppSettings.BACKEND_HOSTNAME_API + '/users', AppSettings.HTTP_OPTIONS);
  }
}
