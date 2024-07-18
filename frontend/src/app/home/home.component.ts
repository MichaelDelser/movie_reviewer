import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {MatCard} from "@angular/material/card"; // Adjust the path as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    MatCard
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Add any necessary initialization code here
  }
}
