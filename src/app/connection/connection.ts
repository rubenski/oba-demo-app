import {CountryDataProvider} from '../provider/country.data.provider';
import {ConnectionRefresh} from '../refreshtask/connection.refresh';

export class Connection {
  id: string;
  userId: string;
  countryDataProvider: CountryDataProvider;
  consentValid: boolean;
  created: string;
  lastConsentTime: string;
  expectedConsentExpirationTime: string;
  latestRefresh: ConnectionRefresh;


  public isRefreshing(): boolean {
    return this.latestRefresh !== null && (!this.latestRefresh.finished && !this.latestRefresh.result);
  }
}

