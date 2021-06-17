import { RestaurantModel } from './../../../Models/restaurant-model/restaurant-model.model';
import { RestaurantServiceService } from './../../../Services/restaurant-service/restaurant-service.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eat',
  templateUrl: './eat.component.html',
  styleUrls: ['./eat.component.css']
})
export class EatComponent implements OnInit, OnDestroy {

  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';
  subscription!: Subscription;

  restaurantsList: RestaurantModel[] = [];

  slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  constructor(private restaurantService: RestaurantServiceService) {
  }

  ngOnInit(): void {
    this.refreshRestaurantsList();

    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }

  refreshRestaurantsList() {
    this.restaurantService.getRestaurantsList().subscribe(data => {
      this.restaurantsList = data;
      this.slides = this.chunk(data, 3);
    });
  }
}
