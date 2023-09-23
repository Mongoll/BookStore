import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "src/app/model/Book";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-viewbook",
  templateUrl: "./viewbook.component.html",
  styleUrls: ["./viewbook.component.css"],
})
export class ViewbookComponent implements OnInit {
  @Input()
  book: Book;

  @Output()
  bookDeletedEvent = new EventEmitter();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  deleteBook() {
    this.userService.deleteBook(this.book.id).subscribe((book) => {
      this.bookDeletedEvent.emit();
      this.router.navigate(["books"]);
    });
  }
  editBook() {
    this.router.navigate(["books"], {
      queryParams: { action: "edit", id: this.book.id },
    });
  }
}
