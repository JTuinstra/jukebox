import {Injectable} from "@angular/core";
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})


export class SpotifyService {

  url = `${environment.url}`;
  user = JSON.parse(localStorage.getItem('user') || '{}').user;

  constructor(private http: HttpClient, private router: Router) {
  }

  search(searchValue: string, selectedOption: string) {
    return this.http.get(`${this.url}/spotify/search`, {params: {searchValue: searchValue, selectedOption: selectedOption, userId: this.user._id}})
  }

}

