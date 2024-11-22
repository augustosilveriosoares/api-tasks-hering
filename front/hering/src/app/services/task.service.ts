import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient);
  API = "http://localhost:8080/tasks";

  constructor() { }

  save(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task);
  }

  update(id: string, task: Task): Observable<Task> {
    const url = `${this.API}/${id}`;
    return this.http.put<Task>(url, task);
  }

  findAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API}?page=${page}&size=${size}`);
  }

  findById(id: string): Observable<Task> {
    const url = `${this.API}/${id}`;
    return this.http.get<Task>(url);
  }

  updateTaskComplete(task: Task) {
    return this.http.patch<Task>(`${this.API}/complete/${task.id}`, task);
  }

  delete(id: string): Observable<void> {
    const url = `${this.API}/${id}`;
    return this.http.delete<void>(url);
  }

}
