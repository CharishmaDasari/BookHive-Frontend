import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { BookDTO } from 'src/app/models/BookDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css']
})
export class UserbooksComponent implements OnInit {


  constructor(
    private bookService: BookService,
    private auth: AuthenticationService,
    private cartService: CartService){}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next:success=>{
        success.reverse();
        this.booksArr = success.reverse();
        this.filteredBooksArr = success.reverse();
      },
      error:failure=>console.log(failure)
    })
    this.auth.authenticateToken(this.auth.getToken()).subscribe({
      next:authToken=>{
        this.usercartid = authToken.userId;
        this.cartService.getCartById(this.usercartid).subscribe({
          next:cart=>this.usercart = cart,
          error:fail=>console.log(fail)
        })
      },
      error:fail=>console.log(fail)
    })
  }


  booksArr: Book[] = [];
  filteredBooksArr: Book[] = [];
 

  role: string = '';

  usercartid: number;
  usercart: Cart = new Cart();

  handleAddToCart(book: Book){
    // let newProduct = new ProductDTO();
    // newProduct.productId = product.id;
    // newProduct.title = product.title;
    // newProduct.price = product.price;
    // newProduct.quantity = 1;

    if(this.usercart.books.length){
      if(this.usercart.books.find(boo=>boo.bookId == book.id)){
        //console.log('product already in cart');
        //dont create new product
        //just edit that products quantity
        this.usercart.books.forEach(boo=>{
          if(boo.bookId == book.id){boo.quantity+=1}
        })
      } else {
        //console.log('new product!!')
        //create new product
        //push product to array
        let newBook= new BookDTO();
        newBook.bookId = book.id;
        newBook.title = book.title;
        newBook.price = book.price;
        newBook.quantity = 1;
        this.usercart.books.push(newBook);
      }
    } else {
      let newBook = new BookDTO();
      newBook.bookId = book.id;
      newBook.title = book.title;
      newBook.price = book.price;
      newBook.quantity = 1;
      this.usercart.books.push(newBook);
     // alert("successfully add to cart");
    }
    alert("successfully add to cart");
    //console.log(this.usercart)
    this.cartService.updateCart(this.usercart).subscribe({
      // next:cart=>console.log(cart),
      // error:fail=>console.log(fail)
    })
  }

}
