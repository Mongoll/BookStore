import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartServiceService } from "src/app/_services/cart-service.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";

const API_URL = "http://localhost:8081/api/";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  cartObj = [];
  cartTotalPrice: any;
  pay_type = "cash_on_delivery";
  delivery_address = "";
  currentUser: any;
  constructor(
    private router: Router,
    private cartService: CartServiceService,
    private http: HttpClient,
    private token: TokenStorageService
  ) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit() {
    this.getCartDetailsByUser(this.currentUser.id);
    //below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
  }

  qtyChange(qty, cartObj) {
    this.cartService.updateQTY(cartObj.id, qty);
  }

  getCartDetailsByUser(currentUser) {
    this.http.get(API_URL + "addtocart/list/" + currentUser, {}).subscribe(
      (data: any) => {
        this.cartObj = data;
        this.cartTotalPrice = this.getTotalAmounOfTheCart();
      },
      (error) => {
        alert("Error while fetching the cart Details");
      }
    );
    return this.cartObj;
  }

  getTotalAmounOfTheCart() {
    let obj = this.cartObj;
    let totalPrice = 0;
    for (var o in obj) {
      totalPrice =
        totalPrice + parseFloat(obj[o].book.price) * parseFloat(obj[o].qty);
    }
    return totalPrice.toFixed(2);
  }

  removeCartById(cartObj) {
    if (confirm("Are you sure want to delete..?")) {
      let id = cartObj.id;
      this.cartService.removeCartItem(id);
      this.ngOnInit;
    }
  }
  checkoutCart() {
    if (this.delivery_address == "") {
      alert("Delivery address should not be empty");
      return;
    }
    if (this.pay_type == "cash_on_delivery") {
      let request = {
        total_price: this.cartTotalPrice,
        pay_type: "COD",
        deliveryAddress: this.delivery_address,
      };
      this.http.post("api/order/checkout_order", request).subscribe(
        (data: any) => {
          alert("checkout process completed.Your Order is processed..");
          this.cartService.getCartDetailsByUser(this.currentUser.id);
          this.router.navigate([""]);
        },
        (error) => {
          alert("Error while fetching the cart Details");
        }
      );
    } else {
      alert("Payment Integration is not yet completed.");
    }
  }
}
