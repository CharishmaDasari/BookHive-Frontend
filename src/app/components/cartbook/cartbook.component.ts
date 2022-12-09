import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookDTO } from 'src/app/models/BookDTO';


@Component({
  selector: 'app-cartbook',
  templateUrl: './cartbook.component.html',
  styleUrls: ['./cartbook.component.css']
})
export class CartbookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log(this.oneBook)
  }

  @Input() oneBook: BookDTO;

  @Output() removeBook: EventEmitter<number> = new EventEmitter<number>();


  handleDelete(){
    // console.log(`delete product no: ${this.oneProduct.productId}`)
    this.removeBook.emit(this.oneBook.bookId);
  }

}
