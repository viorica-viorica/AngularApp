import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HotelModel } from 'src/app/Models/hotel-model/hotel-model.model';
import { HotelServiceService } from 'src/app/Services/hotel-service/hotel-service.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit, OnDestroy {
  rooms: number = 1;
  adults: number = 1;
  children: number = 0;
  private subcription!: Subscription;
  HotelsList: HotelModel[] = [];

  increment(value: string) {
    if (value == 'rooms') {
      if (this.rooms < 3) {
        this.rooms = ++this.rooms;
      }
    }
    else if (value == 'adults') {
      if (this.adults < 6) {
        this.adults = ++this.adults;
      }
    }
    else {
      if (this.children < 20) {
        this.children = ++this.children;
      }
    }
  }

  decrement(value: string) {
    if (value == 'rooms') {
      if (this.rooms > 1) {
        this.rooms = --this.rooms;
      }
    }
    else if (value == 'adults') {
      if (this.adults > 1) {
        this.adults = --this.adults;
      }
    }
    else {
      if (this.children > 0) {
        this.children = --this.children;
      }
    }
  }

  constructor(private hotelService: HotelServiceService) { }

  ngOnInit(): void {
    this.refreshHotelsList();
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe;
    }
  }

  refreshHotelsList() {
    this.hotelService.getHotelsList().subscribe(data => {
      this.HotelsList = data;
    });
  }
}
