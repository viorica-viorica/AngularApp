import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TouristicObjectiveModel } from 'src/app/Models/touristic-objective-model/touristic-objective-model.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  public selectedObjectives!: Observable<TouristicObjectiveModel[]>;
  private _objectives: Subject<TouristicObjectiveModel[]> = new Subject<TouristicObjectiveModel[]>();

  constructor() {
    this.selectedObjectives = this._objectives.asObservable();
  }

  set objectives(value: TouristicObjectiveModel[]){
    this._objectives.next(value);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
