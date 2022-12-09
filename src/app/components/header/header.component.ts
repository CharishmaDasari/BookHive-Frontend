import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() role: string;
  @Input() usercartid: number;

  constructor(
    private cartService: CartService,
    private authentication: AuthenticationService,
    private routing: RoutingService){}

  ngOnInit(): void {
  }

  logout(){
    //delete cart on logout
    this.cartService.deleteCart(this.usercartid).subscribe({
      // next:x=>console.log(x),
      // error:del=>console.log(del)
    })
    //remove token
    this.authentication.removeToken();
    //route to login landing page
    this.routing.loginRouting();
  }

  adminLogout(){
    this.authentication.removeToken();
    this.routing.loginRouting();
  }

}
