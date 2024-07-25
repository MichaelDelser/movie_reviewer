import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {MatCard} from "@angular/material/card";
import {NgForOf} from "@angular/common"; // Adjust the path as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatCard,
    NgForOf
  ],
  styleUrls: ['./home.component.scss']
})
/**
 * Component for the home page.
 * Displays welcome message and search bar.
 * Provides navigation to other parts of the application.
 */
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Add any necessary initialization code here
  }
}
