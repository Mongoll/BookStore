import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Book } from "../model/Book";
import { User } from "../model/User";
import { Cart } from "../model/Cart";

const API_URL = "http://localhost:8081/api/";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public userServiceEvent = new BehaviorSubject<any>(null);
  booksData$ = this.userServiceEvent.asObservable();

  constructor(private http: HttpClient) {}

  /*   getPublicContent(): Observable<any> {
    return this.http.get<Book[]>(API_URL + "books/all");
  } */
  getPublicContent() {
    const booksData = this.http
      .get(API_URL + "books/all")
      .subscribe((booksData) => {
        this.userServiceEvent.next(booksData);
      });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + "user");
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + "admin");
  }
  getUsers(): Observable<any> {
    return this.http.get<User[]>(API_URL + "users/all");
  }

  deleteUser(id): Observable<any> {
    return this.http.delete<User>(API_URL + "users/" + id);
  }

  addBook(newBook: Book): Observable<any> {
    return this.http.post<Book>(API_URL + "books/admin/add", newBook);
  }

  deleteBook(id): Observable<any> {
    return this.http.delete<Book>(API_URL + "books/admin/delete/" + id);
  }

  updateBook(updatedBook: Book): Observable<any> {
    return this.http.put<Book>(API_URL + "books/admin/update", updatedBook);
  }
}
