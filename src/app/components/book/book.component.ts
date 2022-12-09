import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/Book';
import { BookDTO } from 'src/app/models/BookDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import {BookService} from '../../services/book.service'
import { AdminbookdialogComponent } from '../adminbookdialog/adminbookdialog.component';
import { DescriptiondialogComponent } from '../descriptiondialog/descriptiondialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  cartService: any;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private cart: CartService,){}

  ngOnInit(): void {
    // console.log(this.role);
    // console.log(this.usercartid)
    this.img = this.oneBook.url?  this.oneBook.url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwksRMbg8-t7lCathIkt_WxysyC_cvkpC4vg&usqp=CAU"
  }

  BookDTO: BookDTO = new BookDTO();
  usercartid: number;
  img:string;

  @Input() role: string;
  @Input() oneBook: Book;
  // @Input() usercartid: number;

  @Output() handleDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleAddToCart: EventEmitter<Book> = new EventEmitter<Book>();

  edit(){
    // console.log(`edit product with id: ${this.oneProduct.id}`);
    this.dialog.open(AdminbookdialogComponent, {
      width: '300px',
      panelClass: 'custom-dialog',
      data: {book: this.oneBook}
    })
  }

  delete(){
    // console.log(`delete Book with id: ${this.oneBook.id}`);
    let id: number = this.oneBook.id;
    this.bookService.deleteBook(id).subscribe({
      next:success=>console.log(success),
      error:failure=>{
        // console.log(failure);
        if(failure.error.text == "Book Deleted"){
          this.handleDelete.emit(id);
        }
      }
    })
  }

  addToCart(){

    this.handleAddToCart.emit(this.oneBook);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open( DescriptiondialogComponent, {
      width: '500px',
      panelClass: 'custom-dialog',
      data: {book: this.oneBook}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



