import { UsersModel } from './../../../Models/users-model/users-model.model';
import { UsersServiceService } from './../../../Services/users-service/users-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersServiceService) { }

  ngOnInit(): void {
  }
}
