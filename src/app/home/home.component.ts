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
import {DemoAppModalService} from '../demo.app.modal.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  providers: CountryDataProvider[];
  selectedProvider: CountryDataProvider;
  user: User;
  logoUrl = AppSettings.BACKEND_HOSTNAME_STATIC_FILES;
  session: ConsentSession;

  constructor(private userService: UserService,
              private providerService: ProviderService,
              private consentSessionService: ConsentSessionService,
              private cookieService: CookieService,
              private localStorageKeyValueService: LocalStorageKeyValueService,
              private demoAppModalService: DemoAppModalService) {
  }

  private static shouldRedirect(session: ConsentSession): boolean {
    return session.status.pendingRedirect && !session.status.closed && session.status.status === 'in_progress_redirect_needed';
  }

  ngOnInit(): void {
    // Subscribe to the closed event of the modal popup
    this.demoAppModalService.modelClosedEventObservable.subscribe(modalClosedReason => {
      if (modalClosedReason === 'consent-given') {
        this.redirectUser();
      }
    });

    this.userService.findUser().subscribe(user => {
      this.user = user;
    }, error => {
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
        throwError(error);
      }
    );
  }

  private redirectUser() {
    // Before we redirect the user, we set the the combination of the state id and the bank name in local storage.
    // This will allow us to show the bank name in UserReturnComponent when the user returns from the bank.
    this.localStorageKeyValueService.set(this.session.stateId, this.selectedProvider.displayName);
    // Redirect to the bank
    window.location.href = this.session.status.pendingRedirect;
  }

  connect(cdp: CountryDataProvider) {
    this.consentSessionService.createOAuthConsentSession(new CreateConsentSessionRequest(cdp.systemName))
      .subscribe(session => {
        if (HomeComponent.shouldRedirect(session)) {
          // Save the session and the selected country data provider on the component
          this.session = session;
          this.selectedProvider = cdp;
          // Set the selected country data provider on the modal service. This will trigger AppComponent to open the modal window,
          // asking the user for consent and inform them of the upcoming redirect to the bank. When to modal popup is closed, the process
          // will continue in the modal closed event subscription in OnInit.
          this.demoAppModalService.nextMessage(cdp);
        } else {
          // When an oauth consent session is created it should always be ready for redirecting.
          throwError('No redirect in OAuth ConsentSession');
        }
      });
  }
}
