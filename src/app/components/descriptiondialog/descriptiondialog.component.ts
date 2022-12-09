import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../models/Book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-descriptiondialog',
  templateUrl: './descriptiondialog.component.html',
  styleUrls: ['./descriptiondialog.component.css']
})
export class DescriptiondialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DescriptiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService) {}

  book: Book = this.data.book;

  ngOnInit(){
    // console.log(this.data)
  }

  onNoClick(): void {

    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
