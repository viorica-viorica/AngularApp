import { ReservationModel } from './../../Models/reservation-model/reservation-model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  readonly APIUrl = "http://localhost:5000/api/Reservation";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getReservationsList(): Observable<ReservationModel[]>{
    return this.http.get<ReservationModel[]>(this.APIUrl);
  }

  addReservation(reservation: ReservationModel): Observable<ReservationModel>{
    return this.http.post<ReservationModel>(this.APIUrl, reservation);
  }

  updateReservation(id: number, reservation: ReservationModel): Observable<ReservationModel>{
    return this.http.put<ReservationModel>(`${this.APIUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<ReservationModel>{
    return this.http.delete<ReservationModel>(`${this.APIUrl}/${id}`);
  }

  uploadPhoto(val:any): Observable<ReservationModel>{
    return this.http.post<ReservationModel>(this.APIUrl+'/SaveFile', val);
  }
}
