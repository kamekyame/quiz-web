import { Component, inject, signal } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { interval, Subscription } from 'rxjs';
import { Status } from '../service/api.interface';
import { QuestionComponent } from '../question/question.component';
import { WaitingComponent } from '../waiting/waiting.component';
import { FinishComponent } from '../finish/finish.component';

@Component({
  selector: 'app-player',
  imports: [QuestionComponent, WaitingComponent, FinishComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  private readonly apiService = inject(ApiService);

  pollingSubscription: Subscription | undefined;

  /** 現在のステータス */
  status = signal<Status>(
    { status: 'waiting' },
    {
      equal: (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
      },
    },
  );

  ngOnInit() {
    this.updateStatus();
    // ポーリングでステータスを取得
    this.pollingSubscription = interval(3000).subscribe(() => {
      this.updateStatus();
    });
  }

  ngOnDestroy() {
    this.pollingSubscription?.unsubscribe();
  }

  updateStatus() {
    this.apiService.getStatus().subscribe((data) => {
      if (isApiError(data)) return;
      this.status.set(data);
      if (data.status === 'finish') {
        this.pollingSubscription?.unsubscribe();
      }
    });
  }
}
