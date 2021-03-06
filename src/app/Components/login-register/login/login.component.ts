import { AuthService } from './../../../Services/auth.service';
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
  error: String = '';
  public errorMessage: string = '';
  public successMessage: string = '';
  public showError!: boolean;
  public showSuccess!: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersServiceService, private authService: AuthService) { }

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
          this.authService.getUserByUsername(this.user).subscribe(
            (resp: UsersModel) => {
              this.authService.setLoggedInUser(resp);
            },
            () => { },
            () => {
              this.router.navigate(['/home']);
            }
          )
        }
      }, (_error) => {
        this.showError = true;
        this.errorMessage = "Username sau parolă incorectă. Reîncercați!";
        setTimeout(() => {
          this.showError = false;
          this.loginForm.reset();
        },
          2000
        )
      }
      );
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }
}
