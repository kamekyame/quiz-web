import { Component, inject, input, signal } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { Status } from '../service/api.interface';
import { interval, Subscription } from 'rxjs';
import { ScreenFinishComponent } from './screen-finish/screen-finish.component';
import { ScreenWaitingComponent } from './screen-waiting/screen-waiting.component';
import { ScreenQuestionComponent } from './screen-question/screen-question.component';

@Component({
  selector: 'app-projector',
  imports: [
    ScreenFinishComponent,
    ScreenWaitingComponent,
    ScreenQuestionComponent,
  ],
  templateUrl: './projector.component.html',
  styleUrl: './projector.component.scss',
})
export class ProjectorComponent {
  api = inject(ApiService);

  pollingSubscription: Subscription | undefined;

  status = signal<Status>(
    { status: 'waiting' },
    { equal: (a, b) => JSON.stringify(a) === JSON.stringify(b) },
  );

  ngOnInit() {
    // ポーリングでステータスを取得
    this.pollingSubscription = interval(3000).subscribe(() => {
      this.updateStatus();
    });
  }

  ngOnDestroy() {
    this.pollingSubscription?.unsubscribe();
  }

  updateStatus() {
    this.api.getStatus().subscribe((data) => {
      if (isApiError(data)) return;
      this.status.set(data);
      if (data.status === 'finish') {
        this.pollingSubscription?.unsubscribe();
      }
    });
  }
}
