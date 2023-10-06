import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./admin/books/books.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { CheckoutComponent } from "./checkout/checkout/checkout.component";
import { BookPageComponent } from "./book-page/book-page.component";

const routes: Routes = [
  {
    path: "users",
    component: BoardAdminComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },

  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "user", component: BoardUserComponent },
  { path: "cart", component: CheckoutComponent },
  { path: "book/:id", component: BookPageComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
