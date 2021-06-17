import { HotelServiceService } from './../../../Services/hotel-service/hotel-service.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { HotelModel } from 'src/app/Models/hotel-model/hotel-model.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stay',
  templateUrl: './stay.component.html',
  styleUrls: ['./stay.component.css']
})
export class StayComponent implements OnInit, OnDestroy {

  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';
  subscription!: Subscription;

  hotelsList: HotelModel[] = [];

  slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  constructor(private hotelService: HotelServiceService) { }

  ngOnInit(): void {
    this.refreshHotelsList();

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

  refreshHotelsList() {
    this.hotelService.getHotelsList().subscribe(data => {
      this.hotelsList = data;
      this.slides = this.chunk(data, 3);
    });
  }
}
