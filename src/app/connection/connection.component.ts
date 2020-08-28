import {Component, OnInit} from '@angular/core';
import {forkJoin, interval, Observable} from 'rxjs';
import {RefreshTaskService} from '../refreshtask/refresh.task.service';
import {ConnectionService} from './connection.service';
import {Connection} from './connection';
import {ConnectionView} from './connection.view';
import {AccountService} from '../account/account.service';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {Account} from '../account/account';
import {AppSettings} from '../app.settings';

@Component({
  templateUrl: './connection.component.html'
})
export class ConnectionComponent implements OnInit {

  connectionViews: ConnectionView[] = [];
  logoUrl = AppSettings.BACKEND_HOSTNAME_STATIC_FILES;

  constructor(private refreshTaskService: RefreshTaskService,
              private connectionService: ConnectionService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.connectionService.findConnections()
      .subscribe(connections => {
        this.createConnectionViews(connections);
      });
  }

  private createConnectionViews(connections: Connection[]) {
    // Gather a collection of observables for fetching accounts, one for each connection
    const accountsObservables: Observable<Account[]>[] = [];
    connections.forEach(c => {
      accountsObservables.push(this.accountService.findAccountsForConnection(c.id)
        .pipe(
          tap(accounts => {
            this.connectionViews.push(new ConnectionView(c, accounts));
            this.connectionViews.sort((c1, c2) => c1.connection.created > c2.connection.created ? 1 : -1);
            if (c.latestRefresh != null && !c.latestRefresh.finished) {
              this.pollConnection(c, 2000);
            }
          }))
      );
    });

    // Execute and wait for all accounts calls to complete
    forkJoin(accountsObservables).subscribe(accountsForConnections => {
      // No need to do anything here.
    });
  }


  /**
   * We can either poll the refresh task or the connection, since connection refresh entities are part of the connection
   *
   * @param connectionId
   * @private
   */
  private pollConnection(connection: Connection, intervalMillis: number) {
    const subscription = interval(intervalMillis)
      .pipe(
        startWith(0),
        switchMap(() => this.connectionService.findConnection(connection.id))
      )
      .subscribe(updatedConnection => {
        if (updatedConnection.latestRefresh && updatedConnection.latestRefresh.finished) {
          // Once the connection refresh is finished, stop polling and update the associated ConnectionView
          subscription.unsubscribe();
          this.updateConnectionView(updatedConnection);
        }
      });
  }

  private updateConnectionView(connection: Connection) {
    this.connectionViews.forEach(cv => {
      if (cv.connection.id === connection.id) {
        cv.updateConnection(connection);
        this.accountService.findAccountsForConnection(connection.id).subscribe(accounts => {
          cv.accounts = accounts;
        });
      }
    });
  }
}
