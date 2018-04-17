import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public authS : AuthService,  private router : Router) { }

  ngOnInit() {
  }

  logout()
  {
    this.authS.logout();
    this.router.navigateByUrl('');

  }
  
  calendarView()
  {
    this.router.navigateByUrl('calendar');
  }

}
