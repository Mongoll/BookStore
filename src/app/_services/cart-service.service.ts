import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Cart } from "../model/Cart";
import { User } from "../model/User";
import { TokenStorageService } from "./token-storage.service";
import { UserService } from "./user.service";
import { Book } from "../model/Book";

const API_URL = "http://localhost:8081/api/";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  public cartServiceEvent = new BehaviorSubject({});
  cartQty = 0;
  cartObj = [];
  public cartTotalPrice: any;
  currentUser: any;

  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router
  ) {
    this.currentUser = this.token.getUser();
    this.getCartDetailsByUser(this.currentUser.id);
  }

  addCart(newCart: Book, newUser): Observable<any> {
    return this.http.post<Cart>(
      API_URL + "addtocart/add/" + newUser + "/1",
      newCart
    );
  }

  getCartDetailsByUser(newUser): Observable<any> {
    return this.http.get<User>(API_URL + "addtocart/list/" + newUser);
  }

  handleSuccessfulResponse(response) {
    this.cartObj = response;
    this.cartTotalPrice = this.getTotalAmounOfTheCart();
  }

  getCartOBj() {
    return this.cartObj;
  }
  getTotalAmounOfTheCart() {
    let obj = this.cartObj;
    let totalPrice = 0;

    for (var o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }

    return totalPrice.toFixed(2);
  }
  getQty() {
    return this.cartQty;
  }

  removeCartItem(cartItemId) {
    this.http.delete(API_URL + "addtocart/remove/" + cartItemId).subscribe(
      (data: any) => {
        this.getCartDetailsByUser(this.currentUser);
      },
      (error) => {
        alert("Error while fetching the cart Details");
      }
    );
  }

  removeCart(delUserId) {
    this.http.delete(API_URL + "addtocart/delete/" + delUserId).subscribe(
      (data: any) => {
        this.getCartDetailsByUser(this.currentUser);
      },
      (error) => {
        alert("Error while fetching the cart Details");
      }
    );
  }
  updateQTY(cartId, qty) {
    this.http
      .put(API_URL + "addtocart/update/" + cartId + "/" + qty, {})
      .subscribe(
        (data: any) => {
          this.getCartDetailsByUser(this.currentUser); //for updating in the application..
        },
        (error) => {
          alert("Error while fetching the cart Details");
        }
      );
  }
}
