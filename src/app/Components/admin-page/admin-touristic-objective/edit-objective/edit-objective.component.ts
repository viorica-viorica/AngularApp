import { TouristicObjectiveServiceService } from './../../../../Services/touristic-objective-service/touristic-objective-service.service';
import { TouristicObjectiveModel } from './../../../../Models/touristic-objective-model/touristic-objective-model.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-objective',
  templateUrl: './edit-objective.component.html',
  styleUrls: ['./edit-objective.component.css']
})
export class EditObjectiveComponent implements OnInit {

  objective = new TouristicObjectiveModel();
  objectiveId!: number;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  objectiveImage: string = "";

  constructor(private objectiveService: TouristicObjectiveServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.objectiveId = parseInt(params.get('id')!)
    );
    this.loadData();
  }

  loadData() {
    this.objectiveService.getTouristicObjective(this.objectiveId)
      .subscribe(
        (data: TouristicObjectiveModel) => {
          this.objective = data;
          this.objectiveImage = "../../../assets/Objectives/" + data.photo;
          console.log("loadData", data)
        }
      );
  }

  editObjective(f: NgForm) {
    this.objective = f.value;
    console.log("Objective Form: ", this.objective);
    this.objectiveService.updateTouristicObjective(this.objectiveId, f.value)
      .subscribe(
        data => {
          this.successMessage = "Actualizare cu succes!";
          console.log(this.successMessage)
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/admin-page/view-objectives']);
            console.log(data)
          },
            2000
          )
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
          },
            4000)
        }
      )
  }

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    var photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
    else{
      this.objectiveImage = "../../../assets/Objectives/" + photo.name;
      const formData:FormData=new FormData();
      formData.append('uploadedFile', photo, photo.name);
      this.objective.photo = photo.name;
    }
  }

}
