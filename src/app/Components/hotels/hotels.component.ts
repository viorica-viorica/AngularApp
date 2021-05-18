import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  rooms : number = 1;
  adults : number = 1;
  children : number = 0;

  increment(value: string){
    if(value == 'rooms'){
      if(this.rooms < 3){
        this.rooms = ++ this.rooms;
      }
    }
    else if(value == 'adults'){
      if(this.adults < 6){
        this.adults = ++ this.adults;
      }
    }
    else{
      if(this.children < 20){
        this.children = ++this.children;
      }
    }
  }

  decrement(value: string){
    if(value == 'rooms'){
      if(this.rooms > 1){
        this.rooms = -- this.rooms;
      }
    }
    else if(value == 'adults'){
      if(this.adults > 1){
        this.adults = -- this.adults;
      }
    }
    else{
      if(this.children > 0){
        this.children = -- this.children;
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }
}
