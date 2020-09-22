export class UserReturnedUrl {
  userReturnedUrl: string;
  psuIpAddress: string;

  constructor(userReturnedUrl: string, psuIpAddress: string) {
    this.userReturnedUrl = userReturnedUrl;
    this.psuIpAddress = psuIpAddress;
  }
}
