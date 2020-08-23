import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CountryDataProvider} from './provider/country.data.provider';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * Provides a sharable reference to the modal dom element
 */
@Injectable()
export class DemoAppModalService {

  private countryDataProvider = new Subject<CountryDataProvider>();
  countryDataProviderObservable = this.countryDataProvider.asObservable();

  constructor(private modalService: NgbModal) {
  }

  nextMessage(cdp: CountryDataProvider) {
    this.countryDataProvider.next(cdp);
  }

  open(modal: any) {
    this.modalService.open(modal, {centered: true, size: 'lg'}).result.then((result) => {
      console.log('opened?');
      console.log('result: ' + JSON.stringify(result));
    }, (reason) => {
      console.log(reason);
    });
  }
}
