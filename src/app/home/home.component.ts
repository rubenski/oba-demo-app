import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {forkJoin} from 'rxjs';
import {ProviderService} from '../provider/provider.service';
import {CountryDataProvider} from '../provider/country.data.provider';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  providers: CountryDataProvider[];
  selectedProvider: CountryDataProvider;

  constructor(private userService: UserService, private providerService: ProviderService) {
  }

  ngOnInit(): void {

    forkJoin({
      user: this.userService.createUser(),
      providers: this.providerService.findProviders()
    }).subscribe( result => {
      this.providers = result.providers;
    });
  }

  selectProvider(provider: CountryDataProvider) {
    this.selectedProvider = provider;
  }
}
