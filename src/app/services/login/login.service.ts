import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = environment.apiUrl;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  login(user: User): Observable<any> {
    var params = {
      email: user.email,
      password: user.password
    }
    return this.http.post(this.apiUrl + "Users/login", JSON.stringify(params), { headers: this.headers });      
  }
}
