import { HotelModel } from './../../Models/hotel-model/hotel-model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HotelServiceService {

  constructor(private http: HttpClient) { }
  
  readonly APIUrl = "http://localhost:5000/api/Hotel";
  
  readonly PhotoUrl = "http://localhost:5000/Photos";

  getHotelsList(): Observable<HotelModel[]> {
    return this.http.get<HotelModel[]>(this.APIUrl);
  }

  getHotel(id: number): Observable<HotelModel>{
    return this.http.get<HotelModel>(`${this.APIUrl}/${id}`);
  }

  addHotel(hotel: HotelModel): Observable<HotelModel> {
    const newHotel = new HotelModel();
    newHotel.name = hotel.name;
    newHotel.address = hotel.address;
    newHotel.price = hotel.price;
    newHotel.rooms = hotel.rooms;
    newHotel.adults = hotel.adults;
    newHotel.children = hotel.children;
    newHotel.latitude = hotel.latitude;
    newHotel.longitude = hotel.longitude;
    newHotel.hotelUrl = hotel.hotelUrl;
    // formData.photo = hotel.photo;
    return this.http.post<HotelModel>(this.APIUrl, newHotel);
  }

  updateHotel(id: number, hotel: HotelModel): Observable<HotelModel> {
    return this.http.put<HotelModel>(`${this.APIUrl}/${id}`, hotel);
  }

  deleteHotel(id: number): Observable<HotelModel> {
    return this.http.delete<HotelModel>(`${this.APIUrl}/${id}`);
  }

  uploadPhoto(val: any): Observable<HotelModel> {
    return this.http.post<HotelModel>(this.APIUrl + '/SaveFile', val);
  }
}
