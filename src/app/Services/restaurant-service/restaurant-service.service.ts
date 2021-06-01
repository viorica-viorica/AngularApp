import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getRestaurantList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/restaurant');
  }

  addRestaurant(val:any){
    return this.http.post(this.APIUrl+'/restaurant', val);
  }

  updateRestaurant(val:any){
    return this.http.put(this.APIUrl+'/restaurant', val);
  }

  deleteRestaurant(val:any){
    return this.http.delete(this.APIUrl+'/restaurant/'+val);
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/restaurant/SaveFile', val);
  }
}
