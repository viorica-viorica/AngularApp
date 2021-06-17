import { UsersServiceService } from './../../../Services/users-service/users-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPassword } from 'src/app/Models/password/forgot-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {

  public forgotPasswordForm!: FormGroup
  public successMessage!: string;
  public errorMessage!: string;
  public showSuccess!: boolean;
  public showError!: boolean;

  constructor(private userService: UsersServiceService, private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassword: ForgotPassword = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/login-register/reset-password'
    }
    this.userService.forgotPassword('ForgotPassword', forgotPassword)
      .subscribe(_ => {
        this.showSuccess = true;
        this.successMessage = 'Link-ul a fost trimis, verificați email-ul pentru a reseta parola.'
      },
        err => {
          this.showError = true;
          this.errorMessage = 'Adresă de e-mail greșită. Vă rugăm reîncercați!';
        })
  }
}
