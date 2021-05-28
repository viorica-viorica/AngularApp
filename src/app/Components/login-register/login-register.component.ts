import { Component, ViewChild } from "@angular/core";
import { IgxToggleDirective } from "igniteui-angular";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  
  isHiddenLoginForm : boolean = false;
  isHiddenRegisterForm : boolean = true;
  isHiddenForgottenPass : boolean = true;
  isHiddenResetPass : boolean = true;

  toggleLogin(){
    this.isHiddenLoginForm = false;
    this.isHiddenRegisterForm = true;
    this.isHiddenForgottenPass = true;
    this.isHiddenResetPass = true;
  }

  toggleRegister(){
    this.isHiddenLoginForm = true;
    this.isHiddenRegisterForm = false;
    this.isHiddenForgottenPass = true;
    this.isHiddenResetPass = true;
  }

  toggleForgottenPassword(){
    this.isHiddenLoginForm = true;
    this.isHiddenRegisterForm = true;
    this.isHiddenForgottenPass = false;
    this.isHiddenResetPass = true;
  }

  toggleResetPassword(){
    this.isHiddenLoginForm = true;
    this.isHiddenRegisterForm = true;
    this.isHiddenForgottenPass = true;
    this.isHiddenResetPass = false;
  }

  constructor() { }

}
