import { HotelModel } from './../../Models/hotel-model/hotel-model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const APIUrl = "http://localhost:5000/api/hotel";
const PhotoUrl = "http://localhost:5000/Photos";

@Injectable({
  providedIn: 'root'
})

export class HotelServiceService {

  constructor(private http:HttpClient) { }

  getHotelsList(): Observable<HotelModel[]>{
    return this.http.get<HotelModel[]>(APIUrl);
  }

  addHotel(hotel: HotelModel){
    const formData = new FormData();
    formData.append('Name', hotel.Name);
    formData.append('Adress', hotel.Adress);
    formData.append('Price', hotel.Price.toString());
    formData.append('Rooms', hotel.Rooms.toString());
    formData.append('Adults', hotel.Adults.toString());
    formData.append('Children', hotel.Children.toString());
    formData.append('Latitude', hotel.Latitude.toString());
    formData.append('Longitude', hotel.Longitude.toString());
    formData.append('Photo', hotel.Photo);
    return this.http.post(APIUrl+'/add', formData);
  }

  updateHotel(hotel: HotelModel){
    return this.http.put(APIUrl+'/update/', hotel);
  }

  deleteHotel(val:any){
    return this.http.delete(APIUrl+'/'+val);
  }

  uploadPhoto(val:any){
    return this.http.post(APIUrl+'/SaveFile', val);
  }
}
