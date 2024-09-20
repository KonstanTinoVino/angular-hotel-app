import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiULR = 'http://localhost:3001';
  private reservations: Reservation[] = [];

  private reservationID: number =  0;

  constructor(private http: HttpClient) { }

  // CRUD operations

  create(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiULR + '/reservation', reservation);
  }
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiULR + '/reservations');
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiULR + '/reservation/' + id);
  }
  update(id: number, reservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiULR + '/reservation/' + id, reservation);
  }
  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiULR + '/reservation/' + id);
  }
}
