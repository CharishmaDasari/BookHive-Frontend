import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { AuthenticationService } from '../../services/authentication.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private authentication: AuthenticationService){}

  ngOnInit(): void {
    this.authentication.authenticateToken(this.authentication.getToken()).subscribe({
      next:authToken=>{
        // console.log(authToken.userId);
        this.orderService.getOrdersByUserId(authToken.userId).subscribe({
          next:orders=>this.userOrdersArr = orders.reverse(),
          error:failure=>console.log(failure)
        })
      },
      error:failure=>console.log(failure)
    })
  }

  userOrdersArr: Order[] = [];
  role: string = '';

  cancelOrder(id:number){
    this.ngOnInit()
  }

}
