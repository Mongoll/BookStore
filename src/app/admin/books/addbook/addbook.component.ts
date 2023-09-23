import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/_services/user.service";
import { Book } from "../../../model/Book";

@Component({
  selector: "app-addbook",
  templateUrl: "./addbook.component.html",
  styleUrls: ["./addbook.component.css"],
})
export class AddbookComponent implements OnInit {
  @Input()
  book: Book;

  @Output()
  bookAddedEvent = new EventEmitter();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  addBook() {
    if (this.book.id == null) {
      this.userService.addBook(this.book).subscribe((book) => {
        this.bookAddedEvent.emit();
        this.router.navigate(["books"]);
      });
    } else {
      this.userService.updateBook(this.book).subscribe((book) => {
        this.bookAddedEvent.emit();
        this.router.navigate(["books"]);
      });
    }
  }
}
