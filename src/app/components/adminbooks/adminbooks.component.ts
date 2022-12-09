
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';


@Component({
  selector: 'app-adminbooks',
  templateUrl: './adminbooks.component.html',
  styleUrls: ['./adminbooks.component.css']
})
export class AdminbooksComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next:success=>{
        success.reverse();
        this.booksArr = success.reverse();
        this.filteredBooksArr = success.reverse();
      },
      error:failure=>console.log(failure)
    })
  }

  booksArr: Book[] = [];
  filteredBooksArr: Book[] = [];
  newBook: Book = new Book();
  role: string = 'admin';

  newBookForm: FormGroup = this.formBuilder.group({
    title: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    price: this.formBuilder.control('', [Validators.required]),
    url: this.formBuilder.control('', [Validators.required])
  });

  deleteBook(id: number){
    this.ngOnInit();
  }

  addBook(){
    this.newBook.title = this.newBookForm.value['title'];
    this.newBook.description = this.newBookForm.value['description'];
    this.newBook.price = this.newBookForm.value['price'];
    this.newBook.url = this.newBookForm.value['url'];
    // console.log(this.newProduct);
    this.bookService.addNewBook(this.newBook).subscribe({
      next:success=>{
        // console.log(success),
        this.newBookForm.reset();
        this.filteredBooksArr.unshift(success);
      },
      error:failure=>console.log(failure)
    })
  }

}
