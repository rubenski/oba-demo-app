/**
 * A connection that is currently refreshing. A RefreshingConnection is always part of a RefreshTask.
 */
export class RefreshingConnection {
  id: string;
  connectionId: string;
  status: string;
}
