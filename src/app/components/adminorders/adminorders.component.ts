import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit {

  constructor(
    private orderService: OrderService){}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next:orders=>{
        // console.log(orders);
        this.ordersArr = orders.reverse();
        this.filteredOrdersArr = orders;
      },
      error:failure=>console.log(failure)
    })
  }

  ordersArr: Order[] = [];
  filteredOrdersArr: Order[] = [];
  role: string = 'admin';

  viewAllOrders(){
    this.filteredOrdersArr = this.ordersArr;
    // console.log(this.filteredOrdersArr);
  }

  sortByPlaced(){
    this.filteredOrdersArr = this.ordersArr;
    this.filteredOrdersArr = this.filteredOrdersArr.filter(order=>order.deliveryStatus === 'placed');
    // console.log(this.filteredOrdersArr);
  }

  sortByShipped(){
    this.filteredOrdersArr = this.ordersArr;
    this.filteredOrdersArr = this.filteredOrdersArr.filter(order=> order.deliveryStatus === 'shipped');
    // console.log(this.filteredOrdersArr);
  }

  sortByDelivered(){
    this.filteredOrdersArr = this.ordersArr;
    this.filteredOrdersArr = this.filteredOrdersArr.filter(order=> order.deliveryStatus === 'delivered');
    // console.log(this.filteredOrdersArr);
  }

  cancelOrder(id:number){
    this.ngOnInit();
  }

  editOrder(){}

}
