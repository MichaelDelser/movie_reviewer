import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./admin-user-profile.component.scss']
})
export class AdminUserProfileComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEditMode = true;
      this.adminService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue({
          username: user.username,
          role: user.role
        });
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.adminService.updateUser(this.userId!, this.userForm.value).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    } else {
      this.adminService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/admin/users']);
      });
    }
  }
}
