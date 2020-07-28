import {Logos} from './logos';

export class CountryDataProvider {
  id: string;
  systemName: string;
  displayName: string;
  country: string;
  status: string;
  sandbox: boolean;
  products: string[];
  connectionPerAccount: boolean;
  services: string[];
  logos: Logos;
}
