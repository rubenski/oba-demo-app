import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  // public static DEMO_BACKEND_HOSTNAME = 'https://demo.oba.com/api';
  public static DEMO_BACKEND_HOSTNAME = 'https://5978d287d8d7.ngrok.io/api';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
}
