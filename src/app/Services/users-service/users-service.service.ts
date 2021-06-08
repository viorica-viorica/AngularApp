import { UsersModel } from './../../Models/users-model/users-model.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http:HttpClient) { }

  readonly APIUrl = "http://localhost:5000/api/Users";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  getUsersList(): Observable<UsersModel[]>{
    return this.http.get<UsersModel[]>(this.APIUrl);
  }

  getUser(id: number): Observable<UsersModel>{
    return this.http.get<UsersModel>(`${this.APIUrl}/${id}`);
  }

  addUser(user: UsersModel): Observable<UsersModel>{
    const newUser = new UsersModel();
    newUser.firstLastName = user.firstLastName;
    newUser.phoneNumber = user.phoneNumber;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.latitude = user.latitude;
    newUser.longitude = user.longitude;
    newUser.isAdmin = user.isAdmin;
    // newUser.profilePhoto = user.profilePhoto;
    return this.http.post<UsersModel>(this.APIUrl, newUser);
  }

  updateUser(id: number, user: UsersModel): Observable<UsersModel>{
    return this.http.put<UsersModel>(`${this.APIUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<UsersModel>{
    return this.http.delete<UsersModel>(`${this.APIUrl}/${id}`);
  }

  uploadPhoto(val:any): Observable<UsersModel>{
    return this.http.post<UsersModel>(this.APIUrl+'/SaveFile', val);
  }
}
