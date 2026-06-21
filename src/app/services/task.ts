import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskRequest } from '../models/task.model';
import { environment } from '../../environments/environment';

interface Page<T> {
  content: T[];
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  list(): Observable<Page<Task>> {
    return this.http.get<Page<Task>>(this.apiUrl);
  }

  create(task: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}