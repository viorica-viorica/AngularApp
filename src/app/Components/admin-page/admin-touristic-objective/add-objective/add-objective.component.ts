import { Router } from '@angular/router';
import { TouristicObjectiveModel } from './../../../../Models/touristic-objective-model/touristic-objective-model.model';
import { TouristicObjectiveServiceService } from './../../../../Services/touristic-objective-service/touristic-objective-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-objective',
  templateUrl: './add-objective.component.html',
  styleUrls: ['./add-objective.component.css']
})
export class AddObjectiveComponent implements OnInit {

  constructor(private objectiveService: TouristicObjectiveServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  objective: TouristicObjectiveModel | undefined;
  objectiveId!: number;
  name!: string;
  address!: string;
  description!: string;
  schedule!: string;
  latitude!: number;
  longitude!: number;
  objectiveUrl!: string;
  photo!: string;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  objectiveImage: string = "../../../assets/Objectives/objective-icon.jpg";

  objectiveSaveForm = new FormGroup({
    objectiveName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    objectiveAddress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    objectiveDescription: new FormControl('', [Validators.required, Validators.minLength(5)]),
    objectiveSchedule: new FormControl('', [Validators.required, Validators.minLength(1)]),
    objectiveLatitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    objectiveLongitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    objectivePhoto: new FormControl(''),
    objectiveUrl: new FormControl('')
  });

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
      this.photo = photo.name;
    }
  }

  checkObjective() {
    if (!this.name || !this.address || !this.description || !this.schedule || !this.latitude || !this.longitude) {
      this.emptyData = "Toate c??mpurile sunt obloigatorii!"
      setTimeout(() => {
        this.emptyData = '';
      },
        2000)
    }
    else {
      this.createObjective();
    }
  }

  createObjective(){
    this.objective = {
      objectiveId: null!,
      name: this.name,
      address: this.address,
      description: this.description,
      schedule: this.schedule,
      latitude: this.latitude,
      longitude: this.longitude,
      objectiveUrl: this.objectiveUrl,
      photo: this.photo
    };
      if (this.wrongImageFormat === '') {
        this.objectiveService.addTouristicObjective(this.objective)
          .subscribe(
            (callback: any) => {
            if (callback) {
              this.successMessage = "Obiectiv turistic ad??ugat cu succes!";
                console.log(this.successMessage)
                  setTimeout(() => {
                    this.successMessage = '';
                    this.router.navigate(['/admin-page/view-objectives']);
                    console.log(callback)
                  },
                  2000)
                }
                else {
                  this.failMessage = "Ceva nu e bine. ??ncerc?? din nou!";
                    setTimeout(() => {
                      this.failMessage = '';
                    },
                  2000)
                }
              },
            
        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este ??n regul??!";
          },
          4000)
        })
        this.objectiveSaveForm.reset();
      }
  }
}
