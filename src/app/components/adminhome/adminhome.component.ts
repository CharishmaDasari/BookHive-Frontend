import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  role:string = 'admin';

  constructor(
    private authentication: AuthenticationService,
    private routing: RoutingService){}

  ngOnInit(): void {
  }

  logout(){
    this.authentication.removeToken();
    this.routing.loginRouting();
  }

}
