import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {ConsentSession} from './consent.session';
import {CreateConsentSessionRequest} from './create.consent.session.request';
import {UserReturnedUrl} from '../user-return/user.returned.url';

@Injectable()
export class ConsentSessionService {

  constructor(private http: HttpClient) {
  }

  createOAuthConsentSession(request: CreateConsentSessionRequest): Observable<ConsentSession> {
    return this.http.post<ConsentSession>(AppSettings.BACKEND_HOSTNAME_API + '/oauth-consent-sessions', request, AppSettings.HTTP_OPTIONS);
  }

  updateOAuthConsentSessionWithReturnedUser(userReturnedUrl: UserReturnedUrl, stateId: string): Observable<ConsentSession> {
    return this.http.patch<ConsentSession>(AppSettings.BACKEND_HOSTNAME_API + '/oauth-consent-sessions/' + stateId,
      userReturnedUrl, AppSettings.HTTP_OPTIONS);
  }

  findOAuthConsentSession(stateId: string): Observable<ConsentSession> {
    return this.http.get<ConsentSession>(AppSettings.BACKEND_HOSTNAME_API + '/oauth-consent-sessions/' + stateId, AppSettings.HTTP_OPTIONS);
  }
}
