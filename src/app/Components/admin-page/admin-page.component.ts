import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  isHiddenUsersForm : boolean = false;
  isHiddenRestaurantsForm : boolean = true;
  isHiddenHotelsForm : boolean = true;

  toggleUsers(){
    this.isHiddenUsersForm = false;
    this.isHiddenRestaurantsForm = true;
    this.isHiddenHotelsForm = true;
  }

  toggleRestaurants(){
    this.isHiddenUsersForm = true;
    this.isHiddenRestaurantsForm = false;
    this.isHiddenHotelsForm = true;
  }

  toggleHotels(){
    this.isHiddenUsersForm = true;
    this.isHiddenRestaurantsForm = true;
    this.isHiddenHotelsForm = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
