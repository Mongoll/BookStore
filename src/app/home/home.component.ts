import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../model/Book";
import { User } from "../model/User";
import { CartServiceService } from "../_services/cart-service.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { UserService } from "../_services/user.service";
import { CheckoutComponent } from "../checkout/checkout/checkout.component";
import { Cart } from "../model/Cart";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  booksData: Book;
  currentUser: any;
  cartQty: string;
  data = [];
  @Input()
  book: Book;

  @Output()
  cartAddedEvent = new EventEmitter();

  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartServiceService,
    private token: TokenStorageService
  ) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit() {
    this.userService.booksData$.subscribe((newBooksData) => {
      this.booksData = newBooksData;
    });
    this.userService.getPublicContent();

    this.cartService.data$.subscribe((newData) => {
      this.data = newData;
      this.cartQty = this.cartQTY();
    });
    this.cartService.getCartDetailsByUser();
  }

  cartQTY() {
    let qtyList = this.data;
    let qty = 0;
    for (var o in qtyList) {
      qty = qty + parseFloat(qtyList[o].qty);
    }
    return qty.toFixed(0);
  }

  addToCart(book) {
    this.cartService.addCart(book, this.currentUser.id);
  }

  goToCart() {
    this.router.navigate(["/cart"]);
  }

  goToBook(bookId) {
    this.router.navigate(["/book/" + bookId]);
  }

  emptyCart() {
    if (confirm("Are you sure want to delete..?")) {
      let delUserCart = this.currentUser.id;
      this.cartService.removeCart(delUserCart);
    }
  }
}
