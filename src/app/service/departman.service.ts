import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from '../model/student.model';
import { Departman } from '../model/departman.model';

@Injectable()
export class DepartmanService {
  private readonly API_URL = 'http://localhost:8082/departman/';

  dataChange: BehaviorSubject<Departman[]> = new BehaviorSubject<Departman[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllDepartman(): Observable<Departman[]> {
    this.httpClient.get<Departman[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addDepartman(departman: Departman): void {
    this.httpClient.post(this.API_URL, departman).subscribe();
  }

  public updateDepartman(departman: Departman): void {
    this.httpClient.put(this.API_URL + departman.id, departman).subscribe();
  }

  public deleteDepartman(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
