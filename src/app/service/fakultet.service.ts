import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Fakultet } from '../model/fakultet.model';

@Injectable()
export class FakultetService {
  private readonly API_URL = 'http://localhost:8082/fakultet/';

  dataChange: BehaviorSubject<Fakultet[]> = new BehaviorSubject<Fakultet[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllFakultet(): Observable<Fakultet[]> {
    this.httpClient.get<Fakultet[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addFakultet(fakultet: Fakultet): void {
    this.httpClient.post(this.API_URL, fakultet).subscribe();
  }

  public updateFakultet(fakultet: Fakultet): void {
    this.httpClient.put(this.API_URL + fakultet.id, fakultet).subscribe();
  }

  public deleteFakultet(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
