import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/Book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-adminbookdialog',
  templateUrl: './adminbookdialog.component.html',
  styleUrls: ['./adminbookdialog.component.css']
})
export class AdminbookdialogComponent implements OnInit {


  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AdminbookdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){}

  ngOnInit(): void {
    // console.log(this.book)
  }

  book: Book = this.data.book;

  editBookForm: FormGroup = this.formBuilder.group({
    title: this.formBuilder.control(this.book.title, [Validators.required]),
    description: this.formBuilder.control(this.book.description, [Validators.required]),
    price: this.formBuilder.control(this.book.price, [Validators.min(1.00)]),
    url: this.formBuilder.control(this.book.url, [Validators.required])
  })

  edit(){
    this.book.title = this.editBookForm.value['title'];
    this.book.description = this.editBookForm.value['description'];
    this.book.price = this.editBookForm.value['price'];
    this.book.url = this.editBookForm.value['url'];
    this.dialogRef.close();
    this.bookService.updateBook(this.book).subscribe({
      // next:success=>console.log(success),
      // error:failure=>console.log(failure)
    })
  }

  cancelEdit(){
    this.dialogRef.close();
  }

}
