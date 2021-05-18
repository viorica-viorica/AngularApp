import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  isHiddenEditProfileForm : boolean = false;
  isHiddenEditPasswordForm : boolean = true;

  toggleEditProfile(){
    this.isHiddenEditProfileForm = false;
    this.isHiddenEditPasswordForm = true;
  }

  toggleEditPassword(){
    this.isHiddenEditProfileForm = true;
    this.isHiddenEditPasswordForm = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
