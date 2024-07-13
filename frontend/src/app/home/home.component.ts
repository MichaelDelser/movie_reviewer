import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard} from "@angular/material/card";
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, MatCard, SearchBarComponent],
})
export class HomeComponent {}
