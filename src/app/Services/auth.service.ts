import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../Models/roles.enum';
import { UserLogin } from '../Models/users-model/user-login.model';
import { UsersModel } from '../Models/users-model/users-model.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly APIUrl = "http://localhost:5000/api/Users";
  role!: Role;

  private loggedInUser: UsersModel = {
    userId: null!, firstLastName: '', phoneNumber: '', email: '', username: '', password: '',
    latitude: null!, longitude: null!, profilePhoto: null!, role: null!
  };
  private loggedInUserSubject = new BehaviorSubject<UsersModel | null>(null);

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.loggedInUser.userId = Number(this.cookieService.get('userId'));
    this.loggedInUser.username = this.cookieService.get('username');
    this.loggedInUser.role = this.cookieService.get('role') as Role;
    this.loggedInUserSubject.next(this.loggedInUser);
  }

  getLoggedInUser() {
    return this.loggedInUserSubject.getValue();
  }

  setLoggedInUser(user: UsersModel) {
    this.loggedInUser = user;
    this.loggedInUserSubject.next(user);
    this.cookieService.set('username', user.username);
    this.cookieService.set('role', user.role.toString());
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
      longitude: null!, profilePhoto: null!, role: null!
    };
    this.loggedInUserSubject.next(this.loggedInUser);
  }
}
