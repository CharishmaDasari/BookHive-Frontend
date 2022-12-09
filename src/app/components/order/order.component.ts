import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditorderdialogComponent } from '../adminorderdialog/editorderdialog.component';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';
import { BookDTO } from 'src/app/models/BookDTO';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog){}

  ngOnInit(): void {
    this.booksArr = this.oneOrder.books;
    // console.log(this.role);
    if(this.oneOrder.deliveryStatus == "placed"){
      this.customerCancel = 'available'

    } else {this.customerCancel = '';}
  }

  @Input() oneOrder: Order;
  @Input() role: string;

  @Output() handleDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output() handleUpdate: EventEmitter<Order> = new EventEmitter<Order>();

  booksArr: BookDTO[] = [];
  customerCancel: string = '';
  panelOpenState: boolean = false;

  edit(){
    // console.log(`editing orderNo: ${this.oneOrder.orderNo}`);
    this.dialog.open(EditorderdialogComponent, {
      width: '30vw',
      panelClass: 'custom-dialog',
      data: {order: this.oneOrder}
    })
  }

  delete(){
    let id:number = this.oneOrder.orderNo;
    this.orderService.deleteOrder(id).subscribe({
      next:success=>console.log(success),
      error:failure=>{
        // console.log(failure);
        if(failure.error.text === 'Order Deleted'){
          this.handleDelete.emit(id)
        }
      }
    });
  }

}
