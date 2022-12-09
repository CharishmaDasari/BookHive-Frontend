import { Component,Input, OnInit,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cart } from 'src/app/models/Cart';
import { BookDTO } from 'src/app/models/BookDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { UserorderdialogComponent } from '../userorderdialog/userorderdialog.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // UserAccount: any;
  userCart: Cart;
  booksArr: BookDTO[] = [];
  usercartid: number;
  emptyCart?:boolean = true;

  cartTotal: number = 0;
  noItems: number = 0;

  constructor( private cartService: CartService,
    private dialog: MatDialog,
    private authentication: AuthenticationService,) { }

    @Input() role: string;
    @Input() oneCart: Cart;
    // @Output() handleDelete: EventEmitter<number> = new EventEmitter<number>();
    // @Output() handleUpdate: EventEmitter<Cart> = new EventEmitter<Cart>();


  ngOnInit(): void {
    //Get request for cart.
    this.authentication.authenticateToken(this.authentication.getToken()).subscribe
    ({
      next:authToken=>{
        this.usercartid = authToken.userId;
        this.cartService.getCartById(this.usercartid).subscribe({
          next:cart=>{
            // console.log(cart);
            this.userCart = cart;
            this.booksArr = cart.books;
            this.booksArr.length > 0? this.emptyCart = false: this.emptyCart == true
            this.booksArr.forEach(book=>this.cartTotal+=(book.price*book.quantity))
            this.booksArr.forEach(boo=>this.noItems+=(boo.quantity) )
          },
          error:fail=>console.log(fail)
        })
      },
      error:fail=>console.log(fail)
    })
  }

  removeBook(id:number){
    //console.log(`delete ${id} from productsARR`)
    let removedBook = this.booksArr.find(boo=>boo.bookId == id);
    // let removedProductInd = this.productsArr.findIndex(prod=>prod.productId == id);
    // for(let i =0; i < this.productsArr.length; i++){
    //   console.log(i)
    // }
    this.booksArr = this.booksArr.filter(boo=>boo.bookId !== id);
    this.userCart.books= this.userCart.books.filter(boo=>boo.bookId !== id);
    if(this.booksArr.length < 1){
      this.clearCart();
    }else if(removedBook){
      this.cartTotal = this.cartTotal - (removedBook.price*removedBook.quantity);
      this.noItems = this.noItems - (removedBook.quantity)
      this.cartTotal.toPrecision()
    }
    //console.log(this.userCart)
    this.cartService.updateCart(this.userCart).subscribe({})
  }

  clearCart(){
    this.booksArr = [];
    this.cartTotal = 0;
    this.userCart.books = [];
    this.emptyCart = true
    this.noItems = 0;
    this.cartService.updateCart(this.userCart).subscribe({})
  }

  checkOut(){
    // console.log(this.userCart);
    this.dialog.open(UserorderdialogComponent, {
      width: '300px',
      panelClass: 'custom-dialog',
      data: this.userCart
    }).afterClosed().subscribe(()=>this.clearCart())
  }

  //()=>this.clearCart()
}
