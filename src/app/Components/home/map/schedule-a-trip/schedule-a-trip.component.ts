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

  constructor(private objectiveService: TouristicObjectiveServiceService) { }

  ngOnInit(): void {
    this.refreshObjectivesList();
  }

  refreshObjectivesList(){
    this.objectiveService.getTouristicObjectivesList().subscribe( data => {
      this.objectivesList = data;
    });
  }

  orderSelectedObjectives(){

  }
}
