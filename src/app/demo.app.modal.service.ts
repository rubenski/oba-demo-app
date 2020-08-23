import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CountryDataProvider} from './provider/country.data.provider';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * This service provides a link between the modal popup created from AppComponent and its ouput (consent or no consent), which is needed
 * in HomeComponent.
 */
@Injectable()
export class DemoAppModalService {

  private countryDataProvider = new Subject<CountryDataProvider>();
  private modalClosedEvent = new Subject<string>();

  // When the user selects a country data provider, AppComponent will be able to launch the consent modal,
  // because it subscribes to countryDataProviderObservable
  countryDataProviderObservable = this.countryDataProvider.asObservable();
  // When the user provides consent in the modal, or closes the modal, HomeComponent will know by subscribing to modelClosedEventObservable
  // This will allow it to redirect the user to the bank in case of user consent
  modelClosedEventObservable = this.modalClosedEvent.asObservable();

  constructor(private modalService: NgbModal) {
  }

  nextMessage(cdp: CountryDataProvider) {
    this.countryDataProvider.next(cdp);
  }

  open(modal: any) {
    this.modalService.open(modal, {centered: true, size: 'lg'}).result.then((result) => {
      this.modalClosedEvent.next(result);
    }, (reason) => {
      this.modalClosedEvent.next(reason);
    });
  }
}
