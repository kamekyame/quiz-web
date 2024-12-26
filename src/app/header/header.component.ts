import { Component, computed, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faSolidDisplay,
  faSolidScrewdriverWrench,
} from '@ng-icons/font-awesome/solid';
import { ProjectorService } from '../service/projector.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIcon],
  viewProviders: [provideIcons({ faSolidScrewdriverWrench, faSolidDisplay })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  apiService = inject(ApiService);
  userService = inject(UserService);
  projectorService = inject(ProjectorService);

  isAdmin = computed(() => {
    return this.userService.user()?.role === 'ADMIN';
  });

  signout() {
    if (window.confirm('サインアウトしますか？')) {
      this.userService.signout();
      window.location.href = '/';
    }
  }

  openProjectorPage() {
    const targetWindow = window.open('/projector', '_blank');
    this.projectorService.setWindow(targetWindow);
  }
}
