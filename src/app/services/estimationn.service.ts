import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




const baseUrl = 'http://localhost:4000/api/vote';
@Injectable({
  providedIn: 'root'
})
export class EstimationnService {

  
  public apiURL = 'http://localhost:4000/api/vote/';
  _id? : number;
  constructor(private http: HttpClient) { }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getId(getId?: number){
    this._id = getId;
  }
  public deleteEstimation(id?: number) : Observable<Object>{
    return this.http.delete<object>(`${baseUrl}/${id}`);
  }
}
