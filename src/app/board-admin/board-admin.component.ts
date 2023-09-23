import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../model/User";
import { UserService } from "../_services/user.service";

@Component({
  selector: "app-board-admin",
  templateUrl: "./board-admin.component.html",
  styleUrls: ["./board-admin.component.css"],
})
export class BoardAdminComponent implements OnInit {
  users: Array<User>;
  selectedUser: User;
  action: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.userService
      .getUsers()
      .subscribe((response) => this.handleSuccessfulResponse(response));

    this.activatedRoute.queryParams.subscribe((params) => {
      this.action = params["action"];
      const selectedUserId = params["id"];
      if (selectedUserId) {
        this.selectedUser = this.users.find(
          (user) => user.id === +selectedUserId
        );
      }
    });
  }

  handleSuccessfulResponse(response) {
    this.users = response;
  }

  viewUser(id: number) {
    this.router.navigate(["users"], {
      queryParams: { id, action: "view" },
    });
  }
}
