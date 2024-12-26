import { Component, inject, signal } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { Status } from '../../service/api.interface';
import { ProjectorService } from '../../service/projector.service';

@Component({
  selector: 'app-status',
  imports: [FormsModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  api = inject(ApiService);
  projectorService = inject(ProjectorService);

  result: string | undefined;

  questionId: string | undefined;

  nowStatus = signal<Status | undefined>(undefined);

  sendStatus(status: string, questionId?: string) {
    switch (status) {
      case 'before':
        break;
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

    if (status === 'finish' && !window.confirm('ゲームを終了しますか？'))
      return;

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
          case 'before':
            this.result = 'ステータスを「ゲーム開始前」に設定しました';
            this.nowStatus.set({ status: 'before' });
            break;
          case 'waiting':
            this.result = 'ステータスを「待機中」に設定しました';
            this.nowStatus.set({ status: 'waiting' });
            break;
          case 'open':
            this.result = `問題${questionId}を出題しました`;
            this.nowStatus.set({
              status: 'open',
              questionId: parseQuestionId!,
            });
            break;
          case 'close':
            this.result = `問題${questionId}の回答を締め切りました`;
            this.nowStatus.set({
              status: 'close',
              questionId: parseQuestionId!,
            });
            break;
          case 'finish':
            this.result = 'ステータスを「終了」に設定しました';
            this.nowStatus.set({ status: 'finish' });
            break;
        }
      });
  }

  showAnswers() {
    this.projectorService.postMessage('showAnswers');
  }
}
