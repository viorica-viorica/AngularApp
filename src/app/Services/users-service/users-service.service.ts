import { UserProfil } from './../../Models/users-model/user-profil';
import { UserLogin } from './../../Models/users-model/user-login.model';
import { UsersModel } from './../../Models/users-model/users-model.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ForgotPassword } from 'src/app/Models/password/forgot-password';
import { ResetPassword } from 'src/app/Models/password/reset-password';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  readonly APIUrl = "http://localhost:5000/api/Users";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http: HttpClient){}
  
  getUsersList(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(this.APIUrl);
  }

  getUser(id: number): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.APIUrl}/${id}`);
  }

  register(user: UsersModel): Observable<UsersModel> {
    const newUser = new UsersModel();
    newUser.firstLastName = user.firstLastName;
    newUser.phoneNumber = user.phoneNumber;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.latitude = user.latitude;
    newUser.longitude = user.longitude;
    newUser.role = user.role;
    // newUser.profilePhoto = user.profilePhoto;
    return this.http.post<UsersModel>(this.APIUrl, newUser);
  }

  public login = (user: UserLogin): Observable<UsersModel> => {
    const userForm = new UserLogin();
    userForm.username = user.username;
    userForm.password = user.password;
    return this.http.post<UsersModel>(`${this.APIUrl}` + '/login', userForm);
  }

  public forgotPassword = (route: string, body: ForgotPassword) => {
    return this.http.post(this.createCompleteRoute(route, this.APIUrl), body);
  }

  public resetPassword = (route: string, body: ResetPassword) => {
    return this.http.post(this.createCompleteRoute(route, this.APIUrl), body);
  }

  // updateUser(id: number, user: UserProfil) {
  //   return this.http.put(`${this.APIUrl}/${id}`, user);
  // }

  public updateUser = (route: string, user: UserProfil) => {
    return this.http.put(this.createCompleteRoute(route, this.APIUrl), user);
  }

  deleteUser(id: number): Observable<UsersModel> {
    return this.http.delete<UsersModel>(`${this.APIUrl}/${id}`);
  }

  uploadPhoto(val: any): Observable<UsersModel> {
    return this.http.post<UsersModel>(this.APIUrl + '/SaveFile', val);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
