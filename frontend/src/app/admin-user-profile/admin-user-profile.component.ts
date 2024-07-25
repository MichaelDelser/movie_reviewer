import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel,
    NgIf
  ],
  styleUrls: ['./admin-user-profile.component.scss']
})
/**
 * Component for managing admin user profiles.
 * Displays user profile information and allows editing of user details.
 */
export class AdminUserProfileComponent implements OnInit {
  username: string = '';
  password: string = '';
  role: string = '';
  userId: string = '';
  isCreateMode: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadUser();
    }
    this.route.queryParams.subscribe(params => {
      this.isCreateMode = params['mode'] === 'create';
    });
  }

  loadUser(): void {
    this.adminService.getUserById(this.userId).subscribe(user => {
      this.username = user.username;
      this.role = user.role;
    });
  }

  updateUser(): void {
    const updatedUser = {
      username: this.username,
      password: this.password,
      role: this.role
    };
    if(this.isCreateMode) {
      this.adminService.createUser(updatedUser).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
    else {
      this.adminService.updateUser(this.userId, updatedUser).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
