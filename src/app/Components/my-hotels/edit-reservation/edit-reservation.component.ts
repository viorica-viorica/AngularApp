import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationServiceService } from 'src/app/Services/reservation-service/reservation-service.service';
import { ReservationModel } from 'src/app/Models/reservation-model/reservation-model.model';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  reservation = new ReservationModel();
  reservationId!: number;
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;

  constructor(private reservationService: ReservationServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.reservationId = parseInt(params.get('id')!)
    );
    this.loadData();
  }

  loadData() {
    this.reservationService.getReservation(this.reservationId)
      .subscribe(
        (data: ReservationModel) => {
          this.reservation = data;
          console.log("loadData", data)
        }
      );
  }

  editReservation(f: NgForm) {
    this.reservationService.updateReservation(this.reservationId, f.value)
      .subscribe(
        data => {
          this.successMessage = "Rezervare actualizată cu succes!";
          console.log(this.successMessage)
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/home']);
            console.log(data)
          },
            2000
          )
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
          },
            4000)
        }
      )
  }
}
