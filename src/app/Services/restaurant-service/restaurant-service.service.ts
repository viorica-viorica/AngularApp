import { RestaurantModel } from './../../Models/restaurant-model/restaurant-model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://localhost:5000/api/Restaurant";

  getRestaurantsList(): Observable<RestaurantModel[]>{
    return this.http.get<RestaurantModel[]>(this.APIUrl);
  }

  getRestaurant(id: number): Observable<RestaurantModel>{
    return this.http.get<RestaurantModel>(`${this.APIUrl}/${id}`);
  }

  addRestaurant(restaurant: RestaurantModel): Observable<RestaurantModel>{
    const newRestaurant = new RestaurantModel();
    newRestaurant.name = restaurant.name;
    newRestaurant.address = restaurant.address;
    newRestaurant.schedule = restaurant.schedule;
    newRestaurant.latitude = restaurant.latitude;
    newRestaurant.longitude = restaurant.longitude;
    newRestaurant.photo = restaurant.photo;
    newRestaurant.restaurantUrl = restaurant.restaurantUrl;
    newRestaurant.menuUrl = restaurant.menuUrl;
    return this.http.post<RestaurantModel>(this.APIUrl, newRestaurant);
  }

  updateRestaurant(id: number, restaurant: RestaurantModel): Observable<RestaurantModel>{
    return this.http.put<RestaurantModel>(`${this.APIUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<RestaurantModel>{
    return this.http.delete<RestaurantModel>(`${this.APIUrl}/${id}`);
  }
}
