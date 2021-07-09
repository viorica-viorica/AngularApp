import { ReservationServiceService } from './../../../../Services/reservation-service/reservation-service.service';
import { ReservationModel } from './../../../../Models/reservation-model/reservation-model.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from 'src/app/Models/hotel-model/hotel-model.model';
import { HotelServiceService } from 'src/app/Services/hotel-service/hotel-service.service';
import { UsersModel } from 'src/app/Models/users-model/users-model.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  hotel = new HotelModel();
  hotelId!: number;
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  currentUser!: UsersModel;
  username!: string;
  startDate!: string;
  endDate!: string;
  time: string = "-";

  reservation = new ReservationModel();

  reservationForm = new FormGroup({
    reservationStartDate: new FormControl('', [Validators.required]),
    reservationEndDate: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private hotelService: HotelServiceService,
    private route: ActivatedRoute, private router: Router, private reservationService: ReservationServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.hotelId = parseInt(params.get('id')!)
    );
    this.loadData();

    this.authService.subscribeToLoggedInSubject((user: UsersModel) => {
      this.currentUser = user;
      this.username = this.currentUser.username.toUpperCase();
    });
  }

  loadData() {
    this.hotelService.getHotel(this.hotelId)
      .subscribe(
        (data: HotelModel) => {
          this.hotel = data;
          console.log("loadData", data)
        }
      );
  }

  reserveHotel(){
    this.reservation ={
      reservationId: null!,
      username: this.username,
      reservationName: this.hotel.name,
      startDate: this.reservationForm.get('reservationStartDate')!.value,
      endDate: this.reservationForm.get('reservationEndDate')!.value,
      time: this.time,
      price: this.hotel.price
    }

    console.log(this.reservation);
    this.reservationService.addReservation(this.hotel.hotelId, this.reservation)
      .subscribe(
        (callback: any) => {
          if (callback) {
            this.successMessage = "Rezervare efectuată cu succes!";
            console.log(this.successMessage)
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/my-hotels']);
              console.log(callback)
            },
              2000)
          }
          else {
            this.failMessage = "Ceva nu e bine. Încercă din nou!";
            setTimeout(() => {
              this.failMessage = '';
            },
              2000)
          }
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
          },
            4000)
        })
    this.reservationForm.reset();
      
  }

  setLoggedInUser() {
    this.currentUser = this.authService.getLoggedInUser()!;
  }

  getLoggedInUser() {
    return this.currentUser;
  }
}
