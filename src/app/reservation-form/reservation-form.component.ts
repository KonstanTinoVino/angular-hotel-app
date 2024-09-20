import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.reservationForm = this.formBuilder.group({
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        guestName: ['', [Validators.required , Validators.minLength(2)]],
        guestEmail: ['', [Validators.required, Validators.email]],
        roomNumber: ['', Validators.required]
      });

      let id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      if (id) {
        this.reservationService.getReservation(parseInt(id)).subscribe(reservation => { 
          if (reservation) {
            this.reservationForm.patchValue(reservation);
            console.log(this.reservationForm)
          }
        })
      }
  }
  reservationForm: FormGroup = new FormGroup({});

  onSubmit(): void {
    if (this.reservationForm.valid) {
      if (this.route.snapshot.paramMap.get('id')) {
        this.reservationService.update(
          parseInt(this.route.snapshot.paramMap.get('id')?.toString() || '0'), 
          this.reservationForm.value).subscribe(e => {console.log('Updated: '  + e)});
      }else {
        this.reservationService.create(this.reservationForm.value).subscribe(() => {console.log('Created')});
      }
      this.router.navigate(['/list']);
    }
  }
}
