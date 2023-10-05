import { Component, OnInit } from "@angular/core";
import { Book } from "../../model/Book";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  booksData: Array<Book>;
  selectedBook: Book;
  action: string;

  constructor(
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.userService.booksData$.subscribe((newBooksData) => {
      this.booksData = newBooksData;
    });
    this.userService.getPublicContent();
    this.activedRoute.queryParams.subscribe((params) => {
      this.action = params["action"];
      const selectedBookId = params["id"];
      if (selectedBookId) {
        this.selectedBook = this.booksData.find(
          (book) => book.id === +selectedBookId
        );
      }
    });
  }

  handleSuccessfulResponse(response) {
    this.booksData = response;
  }

  viewBook(id: number) {
    this.router.navigate(["books"], {
      queryParams: { id, action: "view" },
    });
  }

  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(["books"], {
      queryParams: { action: "add" },
    });
  }
}
