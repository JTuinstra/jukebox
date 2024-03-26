import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {LoginService} from "../../services/login/loginService";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

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
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;
    } else {
      this.router.navigate(['/login']);
    }
  }

  search() {
  }

  showAccount() {
    Swal.fire({
      title: 'Account',
      html: `<p>Username: ${this.user.username}</p><p>Email: ${this.user.email}</p>`,
      confirmButtonText: 'Close',
      heightAuto: false
    });
  }


  protected readonly RouterLink = RouterLink;
  protected readonly console = console;
}
