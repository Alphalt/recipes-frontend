import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl: string = environment.apiUrl;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  registerUser(user: User): Observable<any>{
    var params = {
      realm: user.realm,
      username: user.username,
      email: user.email,
      password: user.password,
      emailVerified: user.emailVerified
    }
    return this.http.post(this.apiUrl + "Users", JSON.stringify(params), {headers: this.headers});
  }
}
