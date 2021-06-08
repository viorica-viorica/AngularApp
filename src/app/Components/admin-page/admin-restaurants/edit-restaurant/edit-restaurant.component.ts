import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantModel } from 'src/app/Models/restaurant-model/restaurant-model.model';
import { RestaurantServiceService } from 'src/app/Services/restaurant-service/restaurant-service.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  restaurant = new RestaurantModel();
  restaurantId!: number;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;

  constructor(private restaurantService: RestaurantServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.restaurantId = parseInt(params.get('id')!)
    );
    this.loadData();
  }

  loadData() {
    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(
        (data: RestaurantModel) => {
          this.restaurant = data;
          console.log("loadData", data)
        }
      );
  }

  editRestaurant(f: NgForm) {
    this.restaurant = f.value;
    console.log("Restaurant Form: ", this.restaurant);
    this.restaurantService.updateRestaurant(this.restaurantId, f.value)
      .subscribe(
        data => {
          this.successMessage = "Actualizare cu succes!";
          console.log(this.successMessage)
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/admin-page/view-restaurants']);
            console.log(data)
          },
            2000
          )
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
          },
            4000)
        }
      )
  }

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    this.restaurant.photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(this.restaurant.photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
  }

}
