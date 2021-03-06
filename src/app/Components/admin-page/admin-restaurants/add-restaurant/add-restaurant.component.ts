import { Router } from '@angular/router';
import { RestaurantServiceService } from './../../../../Services/restaurant-service/restaurant-service.service';
import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from 'src/app/Models/restaurant-model/restaurant-model.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  restaurant: RestaurantModel | undefined;
  restaurantId!: number;
  name!: string;
  address!: string;
  schedule!: string;
  latitude!: number;
  longitude!: number;
  photo!: string;
  restaurantUrl!: string;
  menuUrl!: string;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  restaurantImage: string = "../../../assets/Restaurante/restaurant_icon1.jpg";

  restaurantSaveForm = new FormGroup({
    restaurantName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    restaurantAddress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    restaurantSchedule: new FormControl('', [Validators.required, Validators.minLength(1)]),
    restaurantLatitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    restaurantLongitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    restaurantUrl: new FormControl('', [Validators.required, Validators.minLength(1)]),
    restaurantMenuUrl: new FormControl('', [Validators.required, Validators.minLength(1)]),
    restaurantPhoto: new FormControl('')
  });

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    var photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
    else{
      this.restaurantImage = "../../../assets/Restaurante/" + photo.name;
      const formData:FormData=new FormData();
      formData.append('uploadedFile', photo, photo.name);
      this.photo = photo.name;
    }
  }

  checkRestaurant() {
    if (!this.name || !this.address || !this.schedule || !this.latitude || !this.longitude) {
      this.emptyData = "Toate c??mpurile sunt obloigatorii!"
      setTimeout(() => {
        this.emptyData = '';
      },
        2000)
    }
    else {
      this.createRestaurant();
    }
  }

  createRestaurant(){
    this.restaurant = {
      restaurantId: null!,
      name: this.name,
      address: this.address,
      schedule: this.schedule,
      latitude: this.latitude,
      longitude: this.longitude,
      photo: this.photo,
      restaurantUrl: this.restaurantUrl,
      menuUrl: this.menuUrl
    };
      if (this.wrongImageFormat === '') {
        this.restaurantService.addRestaurant(this.restaurant)
          .subscribe(
            (callback: any) => {
            if (callback) {
              this.successMessage = "Restaurant ad??ugat cu succes!";
                console.log(this.successMessage)
                  setTimeout(() => {
                    this.successMessage = '';
                    this.router.navigate(['/admin-page/view-restaurants']);
                    console.log(callback)
                  },
                  2000)
                }
                else {
                  this.failMessage = "Ceva nu e bine. ??ncerc?? din nou!";
                    setTimeout(() => {
                      this.failMessage = '';
                    },
                  2000)
                }
              },
            
        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este ??n regul??!";
          },
          4000)
        })
        this.restaurantSaveForm.reset();
      }
  }
}
