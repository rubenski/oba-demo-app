export class ConsentSession {
  stateId: string;
  userId: string;
  countryDataProviderSystemName: string;
  returnUrl: string;
  created: string;
  status: string;
  updated: string;
  closed: boolean;
  redirect: {
    url: string;
    reason: string;
  };
  connectionId: string;

}

