import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

}
