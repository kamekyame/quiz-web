import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  api = inject(ApiService);

  result: string | undefined;

  sendStatus(status: string, questionId?: number) {
    if (status === 'open' && questionId === null) return;

    this.api.postStatus({ status, questionId }).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        return;
      }
      this.result = 'ステータスを「待機中」に設定しました';
    });
  }
}
