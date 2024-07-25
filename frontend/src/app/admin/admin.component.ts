// admin.component.ts
import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AdminUsersComponent} from "../admin-users/admin-users.component";
import {AdminMoviesComponent} from "../admin-movies/admin-movies.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    AdminUsersComponent,
    AdminMoviesComponent
  ],
  styleUrls: ['./admin.component.scss']
})
/**
 * Main component for admin functionalities.
 * Provides navigation and access to various admin sections like users and movies.
 */
export class AdminComponent { }
