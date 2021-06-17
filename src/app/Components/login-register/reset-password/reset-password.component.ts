import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from './../../../Services/users-service/users-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmationValidatorService } from 'src/app/Services/password-service/password-confirmation-validator.service';
import { ResetPassword } from 'src/app/Models/password/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup;
  public showSuccess!: boolean;
  public showError!: boolean;
  public errorMessage!: string;
  private _email!: string;

  constructor(private userService: UsersServiceService, private _passConfValidator: PasswordConfirmationValidatorService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.resetPasswordForm.get('confirm')!.setValidators([Validators.required,
    this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password')!)]);
    this._email = this.router.snapshot.queryParams['email'];
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;

    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      email: this._email
    }

    this.userService.resetPassword('ResetPassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
      },
        error => {
          this.showError = true;
          this.errorMessage = error;
        })
  }
}
