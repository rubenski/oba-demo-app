import {Component, OnInit} from '@angular/core';
import {ConsentSessionService} from '../consentsession/consent.session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProviderService} from '../provider/provider.service';
import {UserReturnedUrl} from './user.returned.url';
import {LocalStorageKeyValueService} from '../local.storage.key.value.service';
import {ConnectionService} from '../connection/connection.service';
import {RefreshTaskService} from '../refreshtask/refresh.task.service';
import {CreateRefreshTaskRequest} from '../refreshtask/create.refresh.task.request';
import {Connection} from '../connection/connection';
import {IpService} from '../ip/ip.service';

/**
 * Users returning from the bank will land on this component
 */
@Component({
  templateUrl: './user.return.component.html'
})
export class UserReturnComponent implements OnInit {

  private stateId;
  public cdpName: string;
  public connected: boolean;
  public refreshing: boolean;

  constructor(private consentSessionService: ConsentSessionService,
              private connectionService: ConnectionService,
              private providerService: ProviderService,
              private refreshTaskService: RefreshTaskService,
              private ipService: IpService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorageKeyValueService: LocalStorageKeyValueService) {

    this.route.queryParams.subscribe(params => {
      this.stateId = params.state;
    });
  }

  ngOnInit(): void {
    this.cdpName = this.localStorageKeyValueService.get(this.stateId);

    // First check if the consent session is still open. This will prevent the return URL from being sent to OBA for a second time, which
    // will result in an error.
    this.consentSessionService.findOAuthConsentSession(this.stateId).subscribe(consentSession => {
      // If the session isn't closed..
      if (!consentSession.status.closed) {
        // Register the returned user's URL with the consent session (triggers OBA to fetch an access token from the bank)
        this.consentSessionService.updateOAuthConsentSessionWithReturnedUser(new UserReturnedUrl(window.location.href), this.stateId)
          .subscribe(updatedConsentSession => {
            // If OBA succeeds in obtaining a token based on the code in the user return URL..
            if (updatedConsentSession.status.status === 'success_token_obtained') {
              // Create a connection based on this consent session, identified by its stateId
              this.createConnectionAndInitiateDataFetching(this.stateId);
            }
          });
      } else if (!consentSession.connectionId) {
        // This may look a bit strange... It is meant for cases where users refresh the return page when the consent session was closed,
        // but no connection was created yet. This block will ensure the process of creating a connection and refreshing data for it
        // continues in this rare case.
        this.createConnectionAndInitiateDataFetching(this.stateId);
      } else {
        // Another rare case.. Users might refresh the page when the connection was already created, but data fetching hasn't started yet.
        // In this case we fetch the existing connection and start data fetching for it
        this.connectionService.findConnection(consentSession.connectionId).subscribe(connection => {
          // Inform the user
          this.connected = true;
          this.startDataRefresh(connection);
        });
      }
    });
  }

  /**
   * Creates a connection and starts refreshing data by creating a refresh task. We don't wait for results. We don't keep
   * the response of the refresh task creation. We will get the currently refreshing connections again on the account overview page.
   * There is no need to keep this state on the client (although it is possible).
   * @param stateId
   * @private
   */
  private createConnectionAndInitiateDataFetching(stateId: string) {
    this.connectionService.createConnection(this.stateId).subscribe(connection => {
      // Inform the user
      this.connected = true;
      this.startDataRefresh(connection);
    });
  }

  /**
   * Starts a data refresh by creating a refresh task and returns the user to their account overview
   * @param connection
   * @private
   */
  private startDataRefresh(connection: Connection): void {
    // The IP Address of the user is a required field in data fetching, because many banks require it
    this.ipService.getUserIp().subscribe(ip => {
      // Create a refresh task at OBA
      this.refreshTaskService.createRefreshTask(new CreateRefreshTaskRequest(connection.userId, [connection.id], ip.ip))
        .subscribe(task => {
            // Return to accounts overview
            this.refreshing = true;
            this.returnToAccountOverview();
          }
        );
    });
  }

  private returnToAccountOverview() {
    this.router.navigate(['/connections']);
  }

}
