import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {CountryDataProvider} from './country.data.provider';

@Injectable()
export class ProviderService {

  constructor(private http: HttpClient) {
  }

  findProviders(): Observable<CountryDataProvider[]> {
    return this.http.get<any>(AppSettings.DEMO_BACKEND_HOSTNAME + '/providers', AppSettings.HTTP_OPTIONS);
  }
}
