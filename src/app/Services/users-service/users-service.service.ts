import { UserLogin } from './../../Models/users-model/user-login.model';
import { UsersModel } from './../../Models/users-model/users-model.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  readonly APIUrl = "http://localhost:5000/api/Users";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  private loggedInUser: UsersModel = {
    userId: null!, firstLastName: '', phoneNumber: '', email: '', username: '', password: '',
    latitude: null!, longitude: null!, isAdmin: '', profilePhoto: null!
  };
  private loggedInUserSubject = new BehaviorSubject<UsersModel | null>(null);

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.loggedInUser.userId = Number(this.cookieService.get('userId'));
    this.loggedInUser.firstLastName = this.cookieService.get('firstLastName');
    this.loggedInUser.phoneNumber = this.cookieService.get('phoneNumber');
    this.loggedInUser.email = this.cookieService.get('email');
    this.loggedInUser.username = this.cookieService.get('username');
    this.loggedInUser.latitude = Number(this.cookieService.get('latiutde'));
    this.loggedInUser.longitude = Number(this.cookieService.get('longitude'));
    this.loggedInUser.isAdmin = this.cookieService.get('isAdmin');
    // this.loggedInUser.role = Role[this.cookieService.get('role')];
    this.loggedInUserSubject.next(this.loggedInUser);
  }

  getLoggedInUser() {
    return this.loggedInUserSubject.getValue();
  }

  setLoggedInUser(user: UsersModel) {
    this.loggedInUser = user;
    this.loggedInUserSubject.next(user);
    this.cookieService.set('username', user.username);
    this.cookieService.set('isAdmin', user.isAdmin);
    this.cookieService.set('userId', user.userId.toString());
  }


  subscribeToLoggedInSubject(callback: any) {
    this.loggedInUserSubject.subscribe(callback);
  }

  getUserByUsername(user: UserLogin): Observable<UsersModel> {
    const username = new HttpParams()
      .set('username', user.username);
    return this.http.get<UsersModel>(this.APIUrl + '/username', { params: username });
  }

  logout() {
    this.cookieService.deleteAll();
    this.loggedInUser = {
      userId: null!, firstLastName: '', phoneNumber: '', email: '', username: '', password: '', latitude: null!,
      longitude: null!, isAdmin: '', profilePhoto: null!
    };
    this.loggedInUserSubject.next(this.loggedInUser);
    return this.http.get(this.APIUrl + '/logout');
  }

  getUsersList(): Observable<UsersModel[]> {
    return this.http.get<UsersModel[]>(this.APIUrl);
  }

  getUser(id: number): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.APIUrl}/${id}`);
  }

  addUser(user: UsersModel): Observable<UsersModel> {
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

  login(user: UserLogin): Observable<UsersModel> {
    const userForm = new UserLogin();
    userForm.username = user.username;
    userForm.password = user.password;
    return this.http.post<UsersModel>(`${this.APIUrl}` + '/login', userForm);
  }

  updateUser(id: number, user: UsersModel): Observable<UsersModel> {
    return this.http.put<UsersModel>(`${this.APIUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<UsersModel> {
    return this.http.delete<UsersModel>(`${this.APIUrl}/${id}`);
  }

  uploadPhoto(val: any): Observable<UsersModel> {
    return this.http.post<UsersModel>(this.APIUrl + '/SaveFile', val);
  }
}
