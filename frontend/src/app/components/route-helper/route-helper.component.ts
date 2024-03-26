import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-route-helper',
  templateUrl: './route-helper.component.html',
  styleUrls: ['./route-helper.component.css']
})
export class RouteHelperComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
