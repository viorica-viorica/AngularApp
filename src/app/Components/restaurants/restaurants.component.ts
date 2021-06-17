import { RestaurantServiceService } from './../../Services/restaurant-service/restaurant-service.service';
import { RestaurantModel } from './../../Models/restaurant-model/restaurant-model.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {

  private subcription!: Subscription;
  restaurantsList: RestaurantModel[] = [];

  constructor(private restaurantService: RestaurantServiceService) { }

  ngOnInit(): void {
    this.refreshRestaurantsList();
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe;
    }
  }

  refreshRestaurantsList() {
    this.restaurantService.getRestaurantsList().subscribe(data => {
      this.restaurantsList = data;
    });
  }
}
