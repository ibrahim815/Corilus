import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
const AUTH_API = 'http://localhost:4000/api/auth/';
const apiURL = 'http://localhost:4000/api/user/findall';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public apiURL = 'http://localhost:4000/api/user/';

  _id? : number;

  constructor(private http: HttpClient) { }

  listeUser():  Observable<User[]>{
    return this.http.get<User[]>(apiURL,httpOptions);
  }
   register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
    }, httpOptions);
  } 

  public deleteUser(id?: number) : Observable<Object>{
    return this.http.delete<object>(`${this.apiURL}delete/${id}`);
  }
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}update/${this._id}`, user);
  }
  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

 
  getId(getId?: number){
    this._id = getId;
  }
  
  getUserById():Observable<Object>{
    return this.http.get<Object>(`${this.apiURL}/${this._id}`);
  }
  findByTitle(username:any) : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}?username=${username}`);
  }
}
