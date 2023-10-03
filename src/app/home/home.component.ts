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
  books: Array<Book>;
  booksRecieved: Array<Book>;
  cartBooks: Array<Cart>;
  cartRecived: Array<Cart>;
  currentUser: any;
  cartQty = 0;
  data: any;
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
    this.userService.getPublicContent().subscribe(
      (response) => {
        this.handleSuccessfulResponse(response);
      },
      (err) => {
        this.books = JSON.parse(err.error).message;
      }
    );
    this.cartService.data$.subscribe((newData) => {
      // Обновите данные в компоненте при изменении.
      this.data = newData;
    });

    /* let data = this.cartService
      .getCartDetailsByUser(this.currentUser.id)
      .subscribe(
        (response) => {
          this.handleSuccessfulResponseCart(response);
        },
        (err) => {
          this.cartBooks = JSON.parse(err.error).message;
        }
      ); */

    this.cartBooks = [];
  }
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {
      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.title = book.title;
      bookwithRetrievedImageField.imageURL = book.imageURL;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.description = book.description;
      bookwithRetrievedImageField.price = book.price;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  handleSuccessfulResponseCart(response) {
    this.cartBooks = new Array<Cart>();
    this.cartRecived = response;
    this.cartQty = 0;
    for (const cart of this.cartRecived) {
      const cartOfUser = new Cart();
      cartOfUser.book = cart.book;
      cartOfUser.qty = cart.qty;
      cartOfUser.userId = cart.userId;
      this.cartBooks.push(cartOfUser);
    }
    for (var o in this.cartBooks) {
      this.cartQty = this.cartQty + this.cartBooks[o].qty;
    }
  }

  addToCart(book: Book) {
    let cartObj = book;
    let newUser = this.currentUser.id;
    this.cartService.addCart(cartObj, newUser).subscribe((cartObj) => {
      this.cartAddedEvent.emit();
    });
    this.ngOnInit();
  }

  updateCartData(cartData) {
    this.cartBooks = cartData;
  }

  goToCart() {
    this.router.navigate(["/cart"]);
  }

  emptyCart() {
    if (confirm("Are you sure want to delete..?")) {
      let delUserCart = this.currentUser.id;
      this.cartService.removeCart(delUserCart);
    }
  }
}
