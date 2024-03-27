import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  url = `${environment.url}`;
  access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

  constructor(private http: HttpClient, private router: Router) {
  }

  search(searchValue: string, selectedOption: string) {
    return this.http.get(`${this.url}/spotify/search`, {params: {searchValue: searchValue, selectedOption: selectedOption, access_token: this.access_token}})
  }

}

