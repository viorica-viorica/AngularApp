import { TouristicObjectiveModel } from './../../../../Models/touristic-objective-model/touristic-objective-model.model';
import { TouristicObjectiveServiceService } from './../../../../Services/touristic-objective-service/touristic-objective-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-objectives',
  templateUrl: './view-objectives.component.html',
  styleUrls: ['./view-objectives.component.css']
})
export class ViewObjectivesComponent implements OnInit, OnDestroy {

  constructor(private objectiveService: TouristicObjectiveServiceService) { }

  private subcription!: Subscription;
  ObjectivesList: TouristicObjectiveModel[] = [];

  ngOnInit(): void {
    this.refreshObjectivesList();
  }

  ngOnDestroy(){
    if (this.subcription){
      this.subcription.unsubscribe;
    }
  }

  deleteItem(objective: TouristicObjectiveModel) {
    if (confirm('Ești sigur că vrei să ștergi acest hotel?')) {
      this.objectiveService.deleteTouristicObjective(objective.objectiveId)
        .subscribe(
          res => {
            // this.toastr.error("Deleted successfully");
            this.refreshObjectivesList();
          },
          err => { console.log(err) }
        )
    }
  }

  refreshObjectivesList(){
    this.objectiveService.getTouristicObjectivesList().subscribe(data=>{
      this.ObjectivesList=data;
    });
  }
}
