import {SessionStatus} from './session.status';

export class ConsentSession {
  stateId: string;
  userId: string;
  countryDataProviderSystemName: string;
  returnUrl: string;
  created: string;
  userReturnedUrl: string;
  status: SessionStatus;
  connectionId: string;
}

