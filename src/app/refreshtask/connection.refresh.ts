/**
 * A connection that is currently refreshing. A RefreshingConnection is always part of a RefreshTask.
 */
export class ConnectionRefresh {
  id: string;
  refreshTaskId: string;
  connectionId: string;
  created: string;
  finished: boolean;
  result: string;
}
