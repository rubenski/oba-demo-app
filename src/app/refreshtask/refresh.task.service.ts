import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppSettings} from '../app.settings';
import {HttpClient} from '@angular/common/http';
import {CreateRefreshTaskRequest} from './create.refresh.task.request';
import {RefreshTask} from './refresh.task';

@Injectable()
export class RefreshTaskService {

  constructor(private http: HttpClient) {
  }

  createRefreshTask(request: CreateRefreshTaskRequest): Observable<RefreshTask> {
    return this.http.post<RefreshTask>(AppSettings.BACKEND_HOSTNAME_API + '/refresh-tasks', request, AppSettings.HTTP_OPTIONS);
  }

  findRefreshTask(id: string): Observable<RefreshTask> {
    return this.http.get<RefreshTask>(AppSettings.BACKEND_HOSTNAME_API + '/refresh-tasks/' + id, AppSettings.HTTP_OPTIONS);
  }

  findRefreshTasks(id: string): Observable<RefreshTask[]> {
    return this.http.get<RefreshTask[]>(AppSettings.BACKEND_HOSTNAME_API + '/refresh-tasks', AppSettings.HTTP_OPTIONS);
  }
}
