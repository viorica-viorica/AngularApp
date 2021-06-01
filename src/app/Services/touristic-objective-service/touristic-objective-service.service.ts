import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TouristicObjectiveServiceService {

  readonly APIUrl = "http://localhost:5000/api";
  readonly PhotoUrl = "http://localhost:5000/Photos";

  constructor(private http:HttpClient) { }

  getTouristicObjectiveList(): Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/touristicobjective');
  }

  addTouristicObjective(val:any){
    return this.http.post(this.APIUrl+'/touristicobjective', val);
  }

  updateTouristicObjective(val:any){
    return this.http.put(this.APIUrl+'/touristicobjective', val);
  }

  deleteTouristicObjective(val:any){
    return this.http.delete(this.APIUrl+'/touristicobjective/'+val);
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/touristicobjective/SaveFile', val);
  }
}
