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
  password: string = '';

  constructor(private loginService: LoginService) {
  }

  onSubmit() {
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

  }
}
