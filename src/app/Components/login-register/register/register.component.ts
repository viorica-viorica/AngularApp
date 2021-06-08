import { UsersModel } from './../../../Models/users-model/users-model.model';
import { UsersServiceService } from './../../../Services/users-service/users-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UsersServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  user: UsersModel | undefined;
  userId!: number;
  firstLastName!: string;
  phoneNumber!: string;
  email!: string;
  username!: string;
  password!: string;
  latitude: number = 0;
  longitude: number = 0;
  isAdmin: string = "false";
  profilePhoto!: File;
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;

  userSaveForm = new FormGroup({
    userFirstLastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    userEmail: new FormControl('', [Validators.required, Validators.minLength(1)]),
    uUsername: new FormControl('', [Validators.required, Validators.minLength(1)]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  checkUser() {
    if (!this.firstLastName || !this.phoneNumber || !this.email || !this.username || !this.password) {
      this.emptyData = "Toate câmpurile sunt obloigatorii!"
      setTimeout(() => {
        this.emptyData = '';
      },
        2000)
    }
    else {
      this.createUser();
    }
  }

  createUser() {
    this.user = {
      userId: null!,
      firstLastName: this.firstLastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      username: this.username,
      password: this.password,
      latitude: this.latitude,
      longitude: this.longitude,
      isAdmin: this.isAdmin,
      profilePhoto: this.profilePhoto
    };

    console.log(this.user);

    this.userService.addUser(this.user)
      .subscribe(
        (callback: any) => {
          if (callback) {
            this.successMessage = "V-ați înregistrat cu succes!";
            console.log(this.successMessage)
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigateByUrl('login-register/login');
              console.log(callback)
            },
              2000)
          }
          else {
            this.failMessage = "Ceva nu e bine. Încercă din nou!";
            setTimeout(() => {
              this.failMessage = '';
              this.userSaveForm.reset();
            },
              2000)
          }
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
            this.userSaveForm.reset();
          },
            4000)
        })
  }
}
