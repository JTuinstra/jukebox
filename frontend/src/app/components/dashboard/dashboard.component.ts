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
  playlists: any[] = [];
  searchOptions: string[] = ['Track', 'Album', 'Artist', 'Playlist'];
  searchValue: string = '';
  selectedOption: string = this.searchOptions[0];
  searchResults: any[] = [];
  protected readonly console = console;

  constructor(protected spotifyService: SpotifyService, protected loginService: LoginService, protected router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.user = JSON.parse(localStorage.getItem('user') || '{}').user;
      this.spotifyService.getPlaylists().subscribe((response: any) => {
        this.playlists = response.playlists;
        console.log(this.playlists)
      });

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

  addToPlaylist(track: any) {
    const playlists: any = [];

    this.spotifyService.getPlaylists().subscribe((response: any) => {
      response.playlists.forEach((playlist: any) => {
        playlists.push(`<option id="playlistName" value="${playlist.name}">${playlist.name}</option>`);

        Swal.fire({
          title: 'Add to Playlist',
          html: `<select id="playlistSelect" class="swal2-select">${playlists.join('')}</select>`,
          confirmButtonText: 'Add',
          showCancelButton: true,
          heightAuto: false,
          preConfirm: () => {
            const playlistName = document.getElementById('playlistSelect') as HTMLSelectElement;

            this.spotifyService.addTrackToPlaylist(playlistName.value, track).subscribe((response: any) => {
              Swal.fire({
                title: 'Track Added',
                text: 'Track has been added to playlist successfully',
                icon: 'success',
                confirmButtonText: 'Close',
                heightAuto: false
              });
            });
          }
        });
      });
    });
  }

  getPlaylists() {
    return this.spotifyService.getPlaylists().subscribe((response: any) => {
      this.playlists = response.playlists;
    });
  }

  createPlaylist() {
    Swal.fire({
      title: 'Create Playlist',
      html: `<input id="playlistName" class="swal2-input" placeholder="Playlist name"><input id="playlistDesc" class="swal2-input" placeholder="Playlist description">`,
      confirmButtonText: 'Create',
      showCancelButton: true,
      heightAuto: false,
      preConfirm: () => {
        const playlistName = (document.getElementById('playlistName') as HTMLInputElement).value;
        const playlistDesc = (document.getElementById('playlistDesc') as HTMLInputElement).value;

        if (playlistName && playlistName.trim() !== '') {
          this.spotifyService.createPlaylist(playlistName, playlistDesc).subscribe((response: any) => {
            Swal.fire({
              title: 'Playlist Created',
              text: 'Playlist has been created successfully',
              icon: 'success',
              confirmButtonText: 'Close',
              heightAuto: false
            });
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Playlist name cannot be empty',
            icon: 'error',
            confirmButtonText: 'Close',
            heightAuto: false
          });
        }
      }
    });
  }


}
