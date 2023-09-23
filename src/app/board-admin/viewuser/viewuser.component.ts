import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/User";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-viewuser",
  templateUrl: "./viewuser.component.html",
  styleUrls: ["./viewuser.component.css"],
})
export class ViewuserComponent implements OnInit {
  @Input()
  user: User;

  @Output()
  userDeletedEvent = new EventEmitter();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe((user) => {
      this.userDeletedEvent.emit();
      this.router.navigate(["admin", "users"]);
    });
  }
}
