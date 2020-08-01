import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {ProviderService} from '../provider/provider.service';
import {CountryDataProvider} from '../provider/country.data.provider';
import {ConsentSessionService} from '../consentsession/consent.session.service';
import {User} from '../user/user';
import {CreateConsentSessionRequest} from '../consentsession/create.consent.session.request';
import {AppSettings} from '../app.settings';
import {ConsentSession} from '../consentsession/consent.session';
import {CookieService} from 'ngx-cookie-service';
import {throwError} from 'rxjs';
import {LocalStorageKeyValueService} from '../local.storage.key.value.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  providers: CountryDataProvider[];
  selectedProvider: CountryDataProvider;
  user: User;
  logoUrl = AppSettings.BACKEND_HOSTNAME_STATIC_FILES;

  constructor(private userService: UserService,
              private providerService: ProviderService,
              private consentSessionService: ConsentSessionService,
              private cookieService: CookieService,
              private localStorageKeyValueService: LocalStorageKeyValueService) {
  }

  private static shouldRedirect(session: ConsentSession): boolean {
    return session.status.pendingRedirect && !session.status.closed && session.status.status === 'in_progress_redirect_needed';
  }

  ngOnInit(): void {

    this.userService.findUser().subscribe(user => {
      this.user = user;
    }, error => {
      console.log('err ' + JSON.stringify(error));
      if (error.status === 404 && error.url.endsWith('/api/users')) {
        this.userService.createUser().subscribe(user => {
          this.user = user;
        });
      }
    });

    this.providerService.findProviders().subscribe(providers => {
        this.providers = providers;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  selectProvider(provider: CountryDataProvider) {
    this.selectedProvider = provider;
  }

  connect() {
    this.consentSessionService.createConsentSession(new CreateConsentSessionRequest(this.selectedProvider.systemName))
      .subscribe(session => {
        if (HomeComponent.shouldRedirect(session)) {
          // Before we redirect the user, we set the the combination of the state id and the bank name in local storage.
          // This will allow us to show the bank name in UserReturnComponent when the user returns from the bank.
          this.localStorageKeyValueService.set(session.stateId, this.selectedProvider.displayName);
          // Redirect to the bank
          window.location.href = session.status.pendingRedirect;
        } else {
          throwError('No redirect in OAuth ConsentSession');
        }
      });
  }
}
