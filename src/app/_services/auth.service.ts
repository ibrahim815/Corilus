import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:4000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthentificated() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }
   login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  } 
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
    }, httpOptions);
  }
  forgotpassword(email:string): Observable<any> {
    return this.http.post(AUTH_API+'forgot-password',{email}, httpOptions);
  }

  resetpassword(token:string,password:string): Observable<any> {
    return this.http.put(AUTH_API +'reset-password',{token,password},httpOptions);}
}