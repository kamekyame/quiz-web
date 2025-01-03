import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  router = inject(Router);

  isMobileLayout = signal(true);
  isProjector = signal(false);

  ngOnInit() {
    // 管理画面等は幅を制限しない
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('control') || url.includes('projector')) {
          this.isMobileLayout.set(false);
        } else {
          this.isMobileLayout.set(true);
        }

        if (url.includes('projector')) {
          this.isProjector.set(true);
        } else {
          this.isProjector.set(false);
        }
      });
  }
}
