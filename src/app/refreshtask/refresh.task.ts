/**
 * A task that refreshes one or more connections. Each connection in the task is represented by a RefreshingConnection.
 */
import {ConnectionRefresh} from './connection.refresh';

export class RefreshTask {
  id: string;
  userId: string;
  finished: string;
  created: string;
  connectionRefreshes: ConnectionRefresh[];
}
