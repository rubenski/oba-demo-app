import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {ConsentSession} from './consent.session';
import {CreateConsentSessionRequest} from './create.consent.session.request';

@Injectable()
export class ConsentSessionService {

  constructor(private http: HttpClient) {
  }

  createConsentSession(request: CreateConsentSessionRequest): Observable<ConsentSession> {
    return this.http.post<ConsentSession>(AppSettings.DEMO_BACKEND_HOSTNAME + '/oauth-consent-sessions', request, AppSettings.HTTP_OPTIONS);
  }
}
