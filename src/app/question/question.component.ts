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
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidQ } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'app-question',
  imports: [AuthImageDirective, NgIcon],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  viewProviders: [provideIcons({ faSolidQ })],
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

  selectId = signal<number | undefined>(undefined);

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
        this.selectId.set(undefined);
      });
    });
  }

  sendAnswer(choiceId: number) {
    const question = this.question();
    if (!question) return;
    const oldChoiceId = this.selectId();
    this.selectId.set(choiceId);
    this.result = '';
    this.api.postAnswer(question.questionId, { choiceId }).subscribe((data) => {
      if (isApiError(data)) {
        // エラー処理
        this.result = `${data.error.message}（${data.error.code}）`;
        this.selectId.set(oldChoiceId);
        return;
      }
      const choice = question.choices.find((c) => c.choiceId === choiceId);
      this.result = `${choice?.text} を選択中`;
    });
  }
}
