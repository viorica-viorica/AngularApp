import { TripService } from './../../../../Services/trip-service/trip.service';
import { TouristicObjectiveServiceService } from './../../../../Services/touristic-objective-service/touristic-objective-service.service';
import { Component, OnInit } from '@angular/core';
import { TouristicObjectiveModel } from 'src/app/Models/touristic-objective-model/touristic-objective-model.model';

@Component({
  selector: 'app-schedule-a-trip',
  templateUrl: './schedule-a-trip.component.html',
  styleUrls: ['./schedule-a-trip.component.css']
})
export class ScheduleATripComponent implements OnInit {

  objectivesList: TouristicObjectiveModel[] = [];
  selectedObjectives: TouristicObjectiveModel[] = [];
  orderedList: TouristicObjectiveModel[] = [];

  constructor(private objectiveService: TouristicObjectiveServiceService, private tripService: TripService) { }

  ngOnInit(): void {
    this.refreshObjectivesList();
  }

  refreshObjectivesList(){
    this.objectiveService.getTouristicObjectivesList().subscribe( data => {
      this.objectivesList = data;
    });
  }

  orderSelectedObjectives(){
    console.log(this.selectedObjectives);
    this.tripService.selectedObjectives.subscribe((data: TouristicObjectiveModel[]) =>{
      this.orderedList = data;
      console.log("ordered list", data);
    });
    this.tripService.objectives = this.selectedObjectives;

    console.log(this.orderedList);
  }
}
