import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() {
    this.reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    this.reservationID = this.reservations.length;
  }

  private reservations: Reservation[] = [];

  private reservationID: number =  0;

  // CRUD operations

  create(reservation: Reservation): void {
    reservation.id = this.reservationID++;
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  getReservations(): Reservation[] {
    return this.reservations;
  }
  delete(reservationId: number): void {
    const index = this.reservations.findIndex(r => r.id === reservationId);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  update(id: number, reservation: Reservation): void {
    reservation.id = id;
    const index = this.reservations.findIndex(r => r.id === id);
    this.reservations[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  getReservation(id: number): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }
}
