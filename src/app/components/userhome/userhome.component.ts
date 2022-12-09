import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  CartService: any;

  usercartid: number;
  role:string = '';

  constructor(
    private authentication: AuthenticationService,
    private routing: RoutingService,
    private cartService: CartService){}

    ngOnInit(): void {
      //Create a cart - post request. Fetch userID
      //UserID = CartID
      //this.CartService.cartId = this.UserAccount.userId;
      this.authentication.authenticateToken(this.authentication.getToken()).subscribe({
       next:authToken=> {
        this.usercartid = authToken.userId;
        // this.cartService.createNewCart(this.CartService.cart).subscribe({
        //   //this.CartService.cartId === this.UserAccount.userId,
        // })
       },
       error:fail=>console.log(fail)
      })


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

}
