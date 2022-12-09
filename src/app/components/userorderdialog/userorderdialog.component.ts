import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/models/Order';
import { BookDTO } from 'src/app/models/BookDTO';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-userorderdialog',
  templateUrl: './userorderdialog.component.html',
  styleUrls: ['./userorderdialog.component.css']
})
export class UserorderdialogComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private forBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserorderdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){}

  ngOnInit(): void {
    // console.log(this.data)
  }

  booksArr: BookDTO[] = this.data.books;
  newOrder: Order = new Order();

  orderForm: FormGroup = this.forBuilder.group({
    street: this.forBuilder.control('', [Validators.required]),
    city: this.forBuilder.control('', [Validators.required]),
    state: this.forBuilder.control('', [Validators.required]),
    zipcode: this.forBuilder.control('', [Validators.required])
  });

  placeOrder(){
    this.newOrder.books = this.data.books;
    this.newOrder.deliveryStatus = 'placed';
    this.newOrder.userId = this.data.userId;
    this.newOrder.deliveryAddress = `${this.orderForm.value['street']} ${this.orderForm.value['city']}, ${this.orderForm.value['state']} ${this.orderForm.value['zipcode']}`;
    this.newOrder.orderNo = 7;
    alert("succesfully placed order");
    // console.log(this.newOrder);
    // this.dialogRef.
    // this.dialogRef.close();
    this.orderService.placeOrder(this.newOrder).subscribe({
      next:()=>{this.dialogRef.close();
       },
      error:failedOrder=>console.log(failedOrder)
    })
  }

  cancel(){
    this.dialogRef.close()
  }

}
