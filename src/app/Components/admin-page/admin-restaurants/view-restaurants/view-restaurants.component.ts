import { RestaurantServiceService } from './../../../../Services/restaurant-service/restaurant-service.service';
import { RestaurantModel } from './../../../../Models/restaurant-model/restaurant-model.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-restaurants',
  templateUrl: './view-restaurants.component.html',
  styleUrls: ['./view-restaurants.component.css']
})
export class ViewRestaurantsComponent implements OnInit, OnDestroy {

  constructor(private restaurantService: RestaurantServiceService) { }

  private subcription!: Subscription;
  RestaurantsList: RestaurantModel[] = [];

  ngOnInit(): void {
    this.refreshRestaurantsList();
  }

  ngOnDestroy(){
    if (this.subcription){
      this.subcription.unsubscribe;
    }
  }

  deleteItem(restaurant: RestaurantModel) {
    if (confirm('Ești sigur că vrei să ștergi acest hotel?')) {
      this.restaurantService.deleteRestaurant(restaurant.restaurantId)
        .subscribe(
          res => {
            // this.toastr.error("Deleted successfully");
            this.refreshRestaurantsList();
          },
          err => { console.log(err) }
        )
    }
  }

  refreshRestaurantsList(){
    this.restaurantService.getRestaurantsList().subscribe(data=>{
      this.RestaurantsList=data;
    });
  }
}
