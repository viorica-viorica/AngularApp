import { TouristicObjectiveModel } from './../../Models/touristic-objective-model/touristic-objective-model.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TouristicObjectiveServiceService {

  readonly APIUrl = "http://localhost:5000/api/TouristicObjective";

  constructor(private http:HttpClient) { }

  getTouristicObjectivesList(): Observable<TouristicObjectiveModel[]>{
    return this.http.get<TouristicObjectiveModel[]>(this.APIUrl);
  }

  getTouristicObjective(id: number): Observable<TouristicObjectiveModel>{
    return this.http.get<TouristicObjectiveModel>(`${this.APIUrl}/${id}`);
  }

  addTouristicObjective(objective: TouristicObjectiveModel): Observable<TouristicObjectiveModel>{
    const newObjective = new TouristicObjectiveModel();
    newObjective.name = objective.name;
    newObjective.address = objective.address;
    newObjective.description = objective.description;
    newObjective.schedule = objective.schedule;
    newObjective.latitude = objective.latitude;
    newObjective.longitude = objective.longitude;
    newObjective.photo = objective.photo;
    newObjective.objectiveUrl = objective.objectiveUrl;
    return this.http.post<TouristicObjectiveModel>(this.APIUrl, newObjective);
  }

  updateTouristicObjective(id: number, objective: TouristicObjectiveModel): Observable<TouristicObjectiveModel>{
    return this.http.put<TouristicObjectiveModel>(`${this.APIUrl}/${id}`, objective);
  }

  deleteTouristicObjective(id: number): Observable<TouristicObjectiveModel>{
    return this.http.delete<TouristicObjectiveModel>(`${this.APIUrl}/${id}`);
  }
}
