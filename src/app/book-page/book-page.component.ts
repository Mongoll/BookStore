import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Book } from "../model/Book";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.css"],
})
export class BookPageComponent implements OnInit {
  book: Book;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBook();
  }
  getBook(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getBookById(id).subscribe((book) => (this.book = book));
  }
}
