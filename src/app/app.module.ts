import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ViewuserComponent } from "./board-admin/viewuser/viewuser.component";
import { BooksComponent } from "./admin/books/books.component";
import { AddbookComponent } from "./admin/books/addbook/addbook.component";
import { ViewbookComponent } from "./admin/books/viewbook/viewbook.component";
import { LoginComponent } from "./login/login.component";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { RegisterComponent } from "./register/register.component";
import { CheckoutComponent } from './checkout/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewuserComponent,
    BooksComponent,
    AddbookComponent,
    ViewbookComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    RegisterComponent,
    CheckoutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
