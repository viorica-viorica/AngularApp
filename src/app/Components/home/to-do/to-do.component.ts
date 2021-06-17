import { TouristicObjectiveServiceService } from './../../../Services/touristic-objective-service/touristic-objective-service.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TouristicObjectiveModel } from 'src/app/Models/touristic-objective-model/touristic-objective-model.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit, OnDestroy {

  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';
  subscription!: Subscription;

  objectivesList: TouristicObjectiveModel[] = [];

  slides: any = [[]];
  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  constructor(private objectiveService: TouristicObjectiveServiceService) { }

  ngOnInit(): void {
    this.refreshObjectivesList();

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

  refreshObjectivesList() {
    this.objectiveService.getTouristicObjectivesList().subscribe(data => {
      this.objectivesList = data;
      this.slides = this.chunk(data, 3);
    });
  }
}
