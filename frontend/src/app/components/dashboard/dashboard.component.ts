import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {LoginService} from "../../services/login/loginService";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  playlists: any[] = [];
  searchControl = new FormControl();
  user: any;

  constructor(private http: HttpClient, protected loginService: LoginService, protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.user = localStorage.getItem('user');
      console.log(this.user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  search() {
  }


  protected readonly RouterLink = RouterLink;
  protected readonly console = console;
}
