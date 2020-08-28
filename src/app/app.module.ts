import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header.component';
import {UserService} from './user/user.service';
import {ProviderService} from './provider/provider.service';
import {ConsentSessionService} from './consentsession/consent.session.service';
import {UserReturnComponent} from './user-return/user.return.component';
import {LocalStorageKeyValueService} from './local.storage.key.value.service';
import {ConnectionService} from './connection/connection.service';
import {RefreshTaskService} from './refreshtask/refresh.task.service';
import {IpService} from './ip/ip.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DemoAppModalService} from './demo.app.modal.service';
import {ConnectionComponent} from './connection/connection.component';
import {AccountService} from './account/account.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserReturnComponent,
    ConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, ProviderService, ConsentSessionService, LocalStorageKeyValueService, ConnectionService,
    RefreshTaskService, IpService, DemoAppModalService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

