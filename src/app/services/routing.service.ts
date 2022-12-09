import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private route: Router){}

  loginRouting(){
    this.route.navigate(['landing', 'login']);
  }
  registerRouting(){
    this.route.navigate(['landing', 'signup']);
  }

}
