import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status',
  imports: [FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  api = inject(ApiService);

  result: string | undefined;

  questionId: string | undefined;

  sendStatus(status: string, questionId?: string) {
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

    // string から number に変換
    const parseQuestionId =
      questionId === undefined ? undefined : parseInt(questionId!);

    this.api
      .postStatus({ status, questionId: parseQuestionId })
      .subscribe((data) => {
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
