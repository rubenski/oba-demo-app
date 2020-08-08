
export class CreateRefreshTaskRequest {
  userId: string;
  connectionIds: string[];
  psuIpAddress: string;

  constructor(userId: string, connectionIds: string[], psuIpAddress: string) {
    this.userId = userId;
    this.connectionIds = connectionIds;
    this.psuIpAddress = psuIpAddress;
  }
}
