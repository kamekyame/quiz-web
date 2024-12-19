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
    switch (status) {
      case 'waiting':
        break;
      case 'open':
        if (questionId === undefined) return;
        break;
      case 'close':
        if (questionId === undefined) return;
        break;
      case 'finish':
        break;
      default:
        return;
    }

    this.api.postStatus({ status, questionId }).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        return;
      }

      switch (status) {
        case 'waiting':
          this.result = 'ステータスを「待機中」に設定しました';
          break;
        case 'open':
          this.result = `問題${questionId}を出題しました`;
          break;
        case 'close':
          this.result = `問題${questionId}の回答を締め切りました`;
          break;
        case 'finish':
          this.result = 'ステータスを「終了」に設定しました';
          break;
      }
    });
  }
}
