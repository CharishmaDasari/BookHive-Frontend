import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-editorderdialog',
  templateUrl: './editorderdialog.component.html',
  styleUrls: ['./editorderdialog.component.css']
})
export class EditorderdialogComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditorderdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){}

  ngOnInit(): void {
    // console.log(this.order)
  }

  order: Order = this.data.order;

  editOrderForm: FormGroup = this.formBuilder.group({
    userId: this.formBuilder.control(this.order.userId),
    status: this.formBuilder.control(this.order.deliveryStatus)
  })

  edit(){
    this.order.userId = this.editOrderForm.value['userId'];
    this.order.deliveryStatus = this.editOrderForm.value['status'];
    this.dialogRef.close();
    this.orderService.editOrder(this.order).subscribe({
      // next:success=>console.log(success),
      // error:failure=>console.log(failure)
    })
  }

  cancelEdit(){
    this.dialogRef.close();
  }

}
