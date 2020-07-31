import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {forkJoin} from 'rxjs';
import {ProviderService} from '../provider/provider.service';
import {CountryDataProvider} from '../provider/country.data.provider';
import {ConsentSessionService} from '../consentsession/consent.session.service';
import {User} from '../user/user';
import {CreateConsentSessionRequest} from '../consentsession/create.consent.session.request';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  providers: CountryDataProvider[];
  selectedProvider: CountryDataProvider;
  user: User;

  constructor(private userService: UserService, private providerService: ProviderService, private consentSessionService: ConsentSessionService) {
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
    console.log('bla');
    this.consentSessionService.createConsentSession(new CreateConsentSessionRequest(this.selectedProvider.systemName))
      .subscribe(session => window.location.href = session.pendingRedirect);
  }
}
