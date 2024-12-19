import { Component, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  apiService = inject(ApiService);
  userService = inject(UserService);

  signout() {
    this.userService.signout();
  }
}
