import {Component, OnInit, ViewChild} from '@angular/core';
import {DemoAppModalService} from './demo.app.modal.service';
import {CountryDataProvider} from './provider/country.data.provider';
import {AppSettings} from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oba-demo-app';
  closeResult: string;
  countryDataProvider: CountryDataProvider;
  logoUrl = AppSettings.BACKEND_HOSTNAME_STATIC_FILES;

  @ViewChild('modal') modal;

  constructor(private demoAppModalService: DemoAppModalService) {
  }

  ngOnInit(): void {
    this.demoAppModalService.countryDataProviderObservable.subscribe(countryDataProvider => {
      this.countryDataProvider = countryDataProvider;
      this.demoAppModalService.open(this.modal);
    });
  }
}
