import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./admin-users.component.scss']
})
/**
 * Component for managing admin users.
 * Displays a list of users and provides actions to manage user roles.
 */

export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  sortOrder: { [key: string]: boolean } = { _id: true, username: true, role: true };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  sortUsers(property: string) {
    this.sortOrder[property] = !this.sortOrder[property];
    const direction = this.sortOrder[property] ? 1 : -1;
    this.users.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  createUser() {
    this.router.navigate(['/admin/user-profile'], { queryParams: { mode: 'create' } });

  }

  editUser(userId: string) {
    this.router.navigate(['/admin/user-profile', userId]);
  }

  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe(() => {
      this.fetchUsers();
    });
  }
}
