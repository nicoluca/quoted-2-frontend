import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-api',
  templateUrl: './user-api.component.html',
  styleUrls: ['./user-api.component.css']
})
export class UserApiComponent implements OnInit {

  api_secret: string = '';
  email: string = '';
  storage: Storage = sessionStorage;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.storage.getItem('userEmail') || '';

    this.userService.getSecretNumber().subscribe(
      (data: any) => {
        this.api_secret = data.secret;
      }
    );
  }

}
