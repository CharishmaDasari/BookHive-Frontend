import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRoutingService {

  constructor(
    private route: Router){}

  userLandingRouting(){
    this.route.navigate(['user']);
  }

    userBookRouting(){}
  userOrdersRouting(){}

  userCartRouting(){}
}
