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
  data = [];
  cartTotalPrice: string;
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
    this.cartService.data$.subscribe((newData) => {
      // Обновите данные в компоненте при изменении.
      this.data = newData;
      this.cartTotalPrice = this.getTotalAmounOfTheCart();
    });
    this.cartService.getCartDetailsByUser();
  }

  qtyChange(qty, data) {
    this.cartService.updateQTY(data.id, qty);
  }

  getTotalAmounOfTheCart() {
    let obj = this.data;
    let totalPrice = 0;
    for (var o in obj) {
      totalPrice =
        totalPrice + parseFloat(obj[o].book.price) * parseFloat(obj[o].qty);
    }
    return totalPrice.toFixed(2);
    alert(totalPrice);
  }

  removeCartById(cartObj) {
    if (confirm("Are you sure want to delete..?")) {
      let id = cartObj.id;
      this.cartService.removeCartItem(id);
    }
  }
}
