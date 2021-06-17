import { TouristicObjectiveServiceService } from './../../Services/touristic-objective-service/touristic-objective-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TouristicObjectiveModel } from 'src/app/Models/touristic-objective-model/touristic-objective-model.model';

@Component({
  selector: 'app-touristic-objectives',
  templateUrl: './touristic-objectives.component.html',
  styleUrls: ['./touristic-objectives.component.css']
})
export class TouristicObjectivesComponent implements OnInit {

  private subcription!: Subscription;
  objectivesList: TouristicObjectiveModel[] = [];

  constructor(private objectiveService: TouristicObjectiveServiceService) { }

  ngOnInit(): void {
    this.refreshObjectivesList();
  }

  ngOnDestroy() {
    if (this.subcription) {
      this.subcription.unsubscribe;
    }
  }

  refreshObjectivesList() {
    this.objectiveService.getTouristicObjectivesList().subscribe(data => {
      this.objectivesList = data;
    });
  }
}
