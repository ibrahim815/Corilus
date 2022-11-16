import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estimation } from '../../model/Estimation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  public Url = 'http://localhost:4000/api/reunion';
  idEstimation?: number;



  private approvalStageMessage = new BehaviorSubject('Basic Approval is required!');
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor(private http:HttpClient) { }
  updateApprovalMessage(message: string) {
    this.approvalStageMessage.next(message)
    }

  sendEmail(url: any, data: any) {
    return this.http.post(url, data);
  }
  getEstimation():Observable<Estimation[]>{
    return this.http.get<Estimation[]>(this.Url, httpOptions);
  }

  createEstimation(Estimation:Estimation):Observable<Estimation>{
    return this.http.post<Estimation>(`${this.Url}`,Estimation);
  }

  getEstimationById():Observable<Object>{
    return this.http.get<Object>(`${this.Url}/${this.idEstimation}`);
  }


  updateEstimation(Estimation:Estimation){
    return this.http.put<Estimation>(`${this.Url}/${this.idEstimation}`,Estimation);
  }

  getId(getId?: number){
    this.idEstimation = getId;
  }

  public deleteEstimation(idEstimation?: number) : Observable<Object>{
    return this.http.delete<object>(`${this.Url}/${idEstimation}`);
  }
/*   getRName(rName: any): Observable<Estimation>{
    return this.http.get('${baseUrl}/${rName}');
  } */

}
