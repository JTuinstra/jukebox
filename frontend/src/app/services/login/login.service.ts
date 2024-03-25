import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    console.log(`${environment.url}/`)
    return this.http.post(`${environment.url}/`, {username: username, password: password}, {observe: 'response'})
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${environment.url}/login/register`, {username: username, email: email, password: password}, {observe: 'response'})
  }
}
