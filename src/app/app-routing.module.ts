import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserReturnComponent} from './user-return/user.return.component';
import {ConnectionComponent} from './connection/connection.component';


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
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
