import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { UsersModel } from 'src/app/Models/users-model/users-model.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from 'src/app/Models/roles.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  opened: boolean = false;
  subscription!: Subscription;
  text!: string;
  username!: string;
  firstLastName!: string;
  currentUser!: UsersModel;

  constructor(private authService: AuthService, private router: Router) { }

  setLoggedInUser() {
    this.currentUser = this.authService.getLoggedInUser()!;
  }

  getLoggedInUser() {
    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login-register/login']); 
  }

  get isAdmin(){
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

  get isLoggedIn(){
    return this.currentUser.username.length > 0;
  }


  ngOnInit() {
    this.authService.subscribeToLoggedInSubject((user: UsersModel) => {
      this.currentUser = user;
      this.username = this.currentUser.username.toUpperCase();
      this.firstLastName = this.currentUser.firstLastName.toUpperCase();
    });
    // console.log(this.currentUser);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
