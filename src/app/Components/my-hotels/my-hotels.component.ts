import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'AngularApp/node_modules/rxjs';
import { ReservationModel } from 'src/app/Models/reservation-model/reservation-model.model';
import { UsersModel } from 'src/app/Models/users-model/users-model.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ReservationServiceService } from 'src/app/Services/reservation-service/reservation-service.service';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.css']
})
export class MyHotelsComponent implements OnInit, OnDestroy {

  username!: string;
  currentUser!: UsersModel;

  isHiddenMyReservations = false;
  isHiddenEditForm = true;

  constructor(private reservationService: ReservationServiceService, private authService: AuthService) { }

  private subcription!: Subscription;
  ReservationsList: ReservationModel[] = [];
  
  ngOnInit(): void {
    this.authService.subscribeToLoggedInSubject((user: UsersModel) => {
      this.currentUser = user;
      this.username = this.currentUser.username;
    });
    this.refreshReservationsList();
  }

  ngOnDestroy(){
    if (this.subcription){
      this.subcription.unsubscribe;
    }
  }

  refreshReservationsList(){
    this.reservationService.getUsersReservationsList(this.username).subscribe(data=>{
      this.ReservationsList=data;
    });
  }

  deleteItem(reservation: ReservationModel) {
    if (confirm('Ești sigur că vrei să ștergi această rezervare?')) {
      this.reservationService.deleteReservation(reservation.reservationId)
        .subscribe(
          res => {
            this.refreshReservationsList();
          },
          err => { console.log(err) }
        )
    }
  }

  toggle(){
    this.isHiddenMyReservations = true;
    this.isHiddenEditForm = false;
  }
}
