import {Logos} from '../provider/logos';
import {AccountData} from './account.data';

export class Account {
  id: string;
  returnedInLastDataRefresh: boolean;
  created: string;
  lastUpdated: string;
  accountData: AccountData;
  countryDataProvider: CountryDataProvider;
}

class CountryDataProvider {
  displayName: string;
  country: string;
  timeZone: string;
  currency: string;
  logos: Logos;
}






