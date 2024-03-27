import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {LoginService} from "../../services/loginService";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegistering: boolean = false;

  constructor(protected loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    if (!this.isRegistering) {
      if (!this.username || !this.password) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in both fields',
          heightAuto: false, // Add this line
          allowOutsideClick: false // And this line
        });
        return;
      }

      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          Swal.fire({
            icon: response.type,
            title: response.type[0].toUpperCase() + response.type.slice(1),
            text: response.message,
            heightAuto: false,
            allowOutsideClick: false
          }).then(() => {
            this.loginService.isLoggedIn.next(true);
            console.log(response)
            localStorage.setItem('user', JSON.stringify({user: response.data}));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('access_token', JSON.stringify(response.access_token));
            this.router.navigate(['dashboard']);
          });
        },
        (error) => {
          console.error(error);
          Swal.fire({
            icon: error.error.type,
            title: error.error.type[0].toUpperCase() + error.error.type.slice(1),
            text: error.error.message,
            heightAuto: false,
            allowOutsideClick: false
          });
        }
      );

    } else {
      if (!this.username || !this.email || !this.password || !this.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all fields',
          heightAuto: false, // Add this line
          allowOutsideClick: false // And this line
        });
        return;
      }

      if (this.password !== this.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match',
          heightAuto: false, // Add this line
          allowOutsideClick: false // And this line
        });
        return;
      }

      this.loginService.register(this.username, this.email, this.password).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message,
            heightAuto: false,
            allowOutsideClick: false
          }).then(() => {
            this.isRegistering = false;
            this.username = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          });
        },
        (error) => {
          Swal.fire({
            icon: error.error.type,
            title: error.error.type.toUpperCase(),
            text: error.error.message,
            heightAuto: false,
            allowOutsideClick: false
          });
        }
      );
    }

  }
}
