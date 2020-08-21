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
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {RefreshTask} from '../refreshtask/refresh.task';

/**
 * Users returning from the bank will land on this component
 */
@Component({
  templateUrl: './user.return.component.html'
})
export class UserReturnComponent implements OnInit {

  private stateId;
  public cdpName: string;
  public connection: Connection;
  public refreshTask: RefreshTask;

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

    // First check if the consent session is still open
    this.consentSessionService.findConsentSession(this.stateId).subscribe(consentSession => {

      if (!consentSession.status.closed) {
        // Register the returned user's URL with the consent session
        this.consentSessionService.updateConsentSessionWithReturnedUser(new UserReturnedUrl(window.location.href), this.stateId)
          .subscribe(updatedConsentSession => {
            if (updatedConsentSession.status.status === 'success_token_obtained') {
              // Create a connection based on this consent session, identified by its stateId
              this.connectionService.createConnection(this.stateId).subscribe(connection => {
                // Inform the user
                this.connection = connection;
                this.refreshData(connection);
              });
            }
          });
      } else if (!consentSession.connectionId) {
        this.connectionService.createConnection(this.stateId).subscribe(connection => {
          // Inform the user
          this.connection = connection;
          this.refreshData(connection);

        });
      } else {
        this.returnHome();
      }
    });
  }

  private refreshData(connection: Connection): void {
    this.ipService.getUserIp().subscribe(ip => {
      this.refreshTaskService.createRefreshTask(new CreateRefreshTaskRequest(connection.userId, [connection.id], ip.ip))
        .subscribe(task => {
            console.log(task);
            // TODO: implement polling here
            this.pollForTaskStatus(task.id);
          }
        );
    });
  }

  private pollForTaskStatus(refreshTaskId: string) {
    const subscription = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.refreshTaskService.findRefreshTask(refreshTaskId))
      )
      .subscribe(refreshTask => {
        this.refreshTask = refreshTask;
        if (refreshTask.finished) {
          subscription.unsubscribe();
        }
      });
  }

  private returnHome() {
    this.router.navigate(['/']);
  }

}
