import {Connection} from './connection';
import {Account} from '../account/account';
import {throwError} from 'rxjs';

/**
 * View wrapper for a connection and its accounts. The view distinguished between three connection states :
 * - The connection has no valid token
 * - The connection has a valid token, but could not be refresh due to a technical error
 * - The connection is OK
 */
export class ConnectionView {
  connection: Connection;
  accounts: Account[];
  connectionStatus: ConnectionStatus;

  constructor(connection: Connection, accounts: Account[]) {
    this.connection = connection;
    this.accounts = accounts;
  }

  public updateConnection(connection: Connection) {
    this.connection = connection;
    this.updateStatus();
  }

  public updateStatus(): ConnectionStatus {
    switch (this.connection.latestRefresh.result) {
      case 'in_progress' : {
        this.connectionStatus = ConnectionStatus.OK;
        return;
      }
      case 'failed_consent_expired' || 'skipped_consent_invalid' : {
        this.connectionStatus = ConnectionStatus.no_valid_consent;
        return;
      }
      case 'failed_bank_timeout' || 'failed_technical_error' || 'failed_unexpected_response_from_bank' || 'failed_technical_error' : {
        this.connectionStatus = ConnectionStatus.technical_error;
        return;
      }
      default: {
        throwError('Unexpected refresh result');
      }
    }
  }
}

enum ConnectionStatus {
  OK, technical_error, no_valid_consent
}
