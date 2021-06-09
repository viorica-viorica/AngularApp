import { UserLogin } from './../../../Models/users-model/user-login.model';
import { UsersServiceService } from './../../../Services/users-service/users-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersModel } from 'src/app/Models/users-model/users-model.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = { username: '', password: '' };
  loginForm!: FormGroup;
  submitted = false;
  error: String = null!;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.userService.login(this.user)
      .subscribe((resp: any) => {
        if (resp) {
          this.userService.getUserByUsername(this.user).subscribe(
            (resp: UsersModel) => {
              this.userService.setLoggedInUser(resp);
              console.log("user logged in: ", resp);
            },
            () => { },
            () => {
              this.router.navigate(['/home']);
            }
          )
        }
      }, error => {
        this.error = "Invalid credentials";
        console.log(error);
      }
      );
  }
}
