import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  username!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
  }
}
