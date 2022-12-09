import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminRoutingService {

  constructor(
    private route: Router){}

  adminLandingRouting(){
    this.route.navigate(['admin']);
  }

  adminOrdersRouting(){
    this.route.navigate(['admin', 'orders']);
  }
}
