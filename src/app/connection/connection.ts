import {CountryDataProvider} from '../provider/country.data.provider';

export class Connection {
  id: string;
  userId: string;
  countryDateProvider: CountryDataProvider;
  consentValid: boolean;
  created: string;
  lastConsentTime: string;
  expectedConsentExpirationTime: string;
  lastDataRefreshTime: string;
}

