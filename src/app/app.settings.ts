import {HttpHeaders} from '@angular/common/http';

export class AppSettings {
  // public static DEMO_BACKEND_HOSTNAME = 'https://demo.oba.com/api';
  public static BACKEND_HOSTNAME_STATIC_FILES = 'https://1e22a40eeb3a.ngrok.io';
  public static BACKEND_HOSTNAME_API = AppSettings.BACKEND_HOSTNAME_STATIC_FILES + '/api';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
}
