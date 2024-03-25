import {Component} from '@angular/core';
import Swal from 'sweetalert2';
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegistering: boolean = false;

  constructor(private loginService: LoginService) {
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

      this.loginService.login(this.username, this.password)
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

      this.loginService.register(this.username, this.email, this.password)
    }

  }
}
