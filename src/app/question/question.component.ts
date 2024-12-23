import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { GetQuestionRes, Status } from '../service/api.interface';
import { AuthImageDirective } from '../directive/auth-image.directive';

@Component({
  selector: 'app-question',
  imports: [AuthImageDirective],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  api = inject(ApiService);

  nowStatus = input.required<Status>();

  /** 問題のステータス。全体のステータスが waiting や finished のときは close になる */
  isOpen = computed(() => {
    const s = this.nowStatus();
    if (s.status === 'open') return true;
    else return false;
  });

  /** 問題番号。全体のステータスが open や close でないときは undefined */
  questionId = computed(() => {
    const s = this.nowStatus();
    if (s.status === 'open' || s.status === 'close') {
      return s.questionId;
    } else {
      return undefined;
    }
  });

  question = signal<GetQuestionRes | undefined>(undefined);

  result: string | undefined;

  constructor() {
    effect(() => {
      const id = this.questionId();
      if (id === undefined) return;
      this.api.getQuestion(id).subscribe((data) => {
        if (isApiError(data)) {
          console.error('問題が取得できませんでした');
          return;
        }
        this.question.set(data);
      });
    });
  }

  sendAnswer(choiceId: number) {
    const question = this.question();
    if (!question) return;
    this.api.postAnswer(question.questionId, { choiceId }).subscribe((data) => {
      if (isApiError(data)) {
        // エラー処理
        this.result = `${data.error.message}（${data.error.code}）`;
        return;
      }
      this.result = `解答${choiceId} を送信しました。`;
    });
  }
}
