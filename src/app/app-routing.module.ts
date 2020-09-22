import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserReturnComponent} from './user-return/user.return.component';
import {ConnectionComponent} from './connection/connection.component';
import {AccountComponent} from './account/account.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full'
}, {
  path: 'user-return',
  component: UserReturnComponent
}, {
  path: 'connections',
  component: ConnectionComponent
}, {
  path: 'accounts/:accountId',
  component: AccountComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
