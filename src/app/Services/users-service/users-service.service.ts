import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getUser(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/users');
  }

  addUser(val:any){
    return this.http.post(this.APIUrl+'/users', val);
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl+'/users', val);
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl+'/users/'+val);
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/users/SaveFile', val);
  }
}
