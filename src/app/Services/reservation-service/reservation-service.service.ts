import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getReservationList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/reservation');
  }

  addReservation(val:any){
    return this.http.post(this.APIUrl+'/reservation', val);
  }

  updateReservation(val:any){
    return this.http.put(this.APIUrl+'/reservation', val);
  }

  deleteReservation(val:any){
    return this.http.delete(this.APIUrl+'/reservation/'+val);
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/reservation/SaveFile', val);
  }
}
