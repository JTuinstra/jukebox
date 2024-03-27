import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {ResponseInterface} from "../responseInterface";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  url = `${environment.url}`;
  isLoggedIn = new BehaviorSubject<boolean>(this.getInitialLoginStatus())


  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<ResponseInterface>(`${this.url}/login/checkCredentials`, {username, password})
  }

  register(username: string, email: string, password: string) {
    return this.http.post<ResponseInterface>(`${this.url}/login/register`, {username, email, password})
  }


  logout() {
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
    localStorage.setItem('isLoggedIn', 'false');
    const user = localStorage.getItem('user');
    // the user will be parsed in the backend
    this.http.post(`${this.url}/session/logout`, {user}).subscribe();
  }

  private getInitialLoginStatus(): boolean {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    return storedLoginStatus === 'true';
  }
}

