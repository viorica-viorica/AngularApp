import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationModel } from 'src/app/Models/reservation-model/reservation-model.model';
import { ReservationServiceService } from 'src/app/Services/reservation-service/reservation-service.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {

  constructor(private reservationService: ReservationServiceService) { }

  private subcription!: Subscription;
  ReservationsList: ReservationModel[] = [];
  
  ngOnInit(): void {
    this.refreshReservationsList();
  }

  ngOnDestroy(){
    if (this.subcription){
      this.subcription.unsubscribe;
    }
  }

  refreshReservationsList(){
    this.reservationService.getReservationsList().subscribe(data=>{
      this.ReservationsList=data;
    });
  }
}
