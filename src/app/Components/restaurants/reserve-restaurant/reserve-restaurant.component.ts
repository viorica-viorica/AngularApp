import { RestaurantServiceService } from './../../../Services/restaurant-service/restaurant-service.service';
import { RestaurantModel } from './../../../Models/restaurant-model/restaurant-model.model';
import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/Models/users-model/users-model.model';
import { ReservationModel } from 'src/app/Models/reservation-model/reservation-model.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationServiceService } from 'src/app/Services/reservation-service/reservation-service.service';

@Component({
  selector: 'app-reserve-restaurant',
  templateUrl: './reserve-restaurant.component.html',
  styleUrls: ['./reserve-restaurant.component.css']
})
export class ReserveRestaurantComponent implements OnInit {

  restaurant = new RestaurantModel();
  restaurantId!: number;
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  currentUser!: UsersModel;
  username!: string;
  startDate!: string;
  endDate: string = "-";
  time!: string;
  price: number = 0;

  reservation = new ReservationModel();

  reservationForm = new FormGroup({
    reservationDate: new FormControl('', [Validators.required]),
    reservationTime: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private restaurantService: RestaurantServiceService,
    private route: ActivatedRoute, private router: Router, private reservationService: ReservationServiceService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.restaurantId = parseInt(params.get('id')!)
    );
    this.loadData();

    this.authService.subscribeToLoggedInSubject((user: UsersModel) => {
      this.currentUser = user;
      this.username = this.currentUser.username.toUpperCase();
    });
  }

  loadData() {
    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(
        (data: RestaurantModel) => {
          this.restaurant = data;
          console.log("loadData", data)
        }
      );
  }

  reserveRestaurant(){
    this.reservation ={
      reservationId: null!,
      username: this.username,
      reservationName: this.restaurant.name,
      startDate: this.reservationForm.get('reservationDate')!.value,
      endDate: this.endDate,
      time: this.reservationForm.get('reservationTime')!.value,
      price: this.price
    }

    console.log(this.reservation);
    this.reservationService.addReservation(this.restaurant.restaurantId, this.reservation)
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
