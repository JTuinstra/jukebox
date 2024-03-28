import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/loginService";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {SpotifyService} from "../../services/spotifyService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  searchOptions: string[] = ['Track', 'Album', 'Artist', 'Playlist'];
  searchValue: string = '';
  selectedOption: string = this.searchOptions[0];
  searchResults: any[] = [];
  protected readonly RouterLink = RouterLink;
  protected readonly console = console;

  constructor(private spotifyService: SpotifyService, protected loginService: LoginService, protected router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;

    } else {
      this.router.navigate(['/login']);
    }
  }

  search() {
    if (this.searchValue) {
      this.spotifyService.search(this.searchValue, this.selectedOption).subscribe((response: any) => {
        this.searchResults = response.data[this.selectedOption.toLowerCase() + 's'].items;
        console.log(this.searchResults[0]);
      });
    }
  }

  showAccount() {
    Swal.fire({
      title: 'Account',
      html: `<p>Username: ${this.user.username}</p><p>Email: ${this.user.email}</p>`,
      confirmButtonText: 'Close',
      heightAuto: false
    });
  }

  logoutSwal() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      heightAuto: false
    }).then((result) => {
      if (result.value) {
        this.loginService.logout();
      }
    });
  }
}
