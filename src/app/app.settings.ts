import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  public static DEMO_BACKEND_HOSTNAME = 'https://demo.oba.com/api';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
}
