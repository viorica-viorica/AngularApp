import { UserProfil } from './../../Models/users-model/user-profil';
import { UsersModel } from './../../Models/users-model/users-model.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from './../../Services/users-service/users-service.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PasswordConfirmationValidatorService } from 'src/app/Services/password-service/password-confirmation-validator.service';
import { ResetPassword } from 'src/app/Models/password/reset-password';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  isHiddenEditProfileForm: boolean = false;
  isHiddenEditPasswordForm: boolean = true;

  username!: string;
  currentUser!: UsersModel;
  user = new UsersModel();
  public editProfileForm!: FormGroup;
  public resetPasswordForm!: FormGroup;
  public showSuccessProfile!: boolean;
  public showSuccessPass!: boolean;
  public showErrorProfile!: boolean;
  public showErrorPass!: boolean;
  public errorMessage!: string;
  private _email!: string;
  private id!: number;

  toggleEditProfile() {
    this.isHiddenEditProfileForm = false;
    this.isHiddenEditPasswordForm = true;
  }

  toggleEditPassword() {
    this.isHiddenEditProfileForm = true;
    this.isHiddenEditPasswordForm = false;
  }

  constructor(private authService: AuthService, private userService: UsersServiceService, private route: ActivatedRoute,
    private _passConfValidator: PasswordConfirmationValidatorService) { }

  ngOnInit(): void {
    this.authService.subscribeToLoggedInSubject((user: UsersModel) => {
      this.currentUser = user;
    });

    this.route.paramMap.subscribe(
      params => this.id = parseInt(params.get('id')!)
    );
    this.loadData();

    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    this.resetPasswordForm.get('confirm')!.setValidators([Validators.required,
    this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password')!)]);
    this._email = this.route.snapshot.queryParams['email'];

    this.id = this.currentUser.userId;
  }

  setLoggedInUser() {
    this.currentUser = this.authService.getLoggedInUser()!;
  }

  getLoggedInUser() {
    return this.currentUser;
  }

  loadData() {
    this.userService.getUser(this.currentUser.userId)
      .subscribe(
        (data: UsersModel) => {
          this.user = data;
        }
      );
  }

  public updateUser (f: NgForm) {
    this.showErrorProfile = this.showSuccessProfile = false;

    const updateUser = {...f.value}
    const updateUserProfile: UserProfil = {
      firstLastName: updateUser.firstLastName,
      phoneNumber: updateUser.phoneNumber,
      email: updateUser.email,
      userId: this.id
    }

    console.log(updateUserProfile);
    this.userService.updateUser('UpdateUser', updateUserProfile)
    .subscribe(_ => {
      this.showSuccessProfile = true;
      setTimeout(() => {
        this.showSuccessProfile = false;
      },
        2000
      )
    },
      (_error) => {
        this.showErrorProfile = true;
        this.errorMessage = "A apărut o eroare. Reîncercați!";
        setTimeout(() => {
          this.showErrorProfile = false;
        },
          2000
        )
      })
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }

  public resetPassword = (resetPasswordFormValue: any) => {
    this.showErrorPass = this.showSuccessPass = false;

    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPassword = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      email: this._email
    }

    this.userService.resetPassword('ResetPassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccessPass = true;
          setTimeout(() => {
            this.showSuccessPass = false;
          },
            2000
          )
      },
        (_error) => {
          this.showErrorPass = true;
          this.errorMessage = "A apărut o eroare. Reîncercați!";
          setTimeout(() => {
            this.showErrorPass = false;
          },
            2000
          )
        })
  }
}
