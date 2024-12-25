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
import { forkJoin, interval, Subscription, tap, timer } from 'rxjs';

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

  INITIAL_REMAINING_TIME = 10;
  remainingTime = signal(this.INITIAL_REMAINING_TIME);
  remainingTimeTimer: Subscription | undefined = undefined;

  sending = signal(false);

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

    effect(() => {
      const isOpen = this.isOpen();
      if (!isOpen) {
        this.remainingTimeTimer?.unsubscribe();
      } else {
        this.remainingTime.set(this.INITIAL_REMAINING_TIME);
        this.remainingTimeTimer = interval(1000).subscribe(() => {
          this.remainingTime.update((time) => Math.floor(time - 1));
        });
      }
    });
  }

  sendAnswer(choiceId: number) {
    const question = this.question();
    if (!question) return;
    const oldChoiceId = this.selectId();
    this.selectId.set(choiceId);
    this.sending.set(true);
    this.result = '送信中…';
    const postObserver = this.api
      .postAnswer(question.questionId, { choiceId })
      .pipe(
        tap((data) => {
          if (isApiError(data)) {
            // エラー処理
            this.result = `${data.error.message}（${data.error.code}）`;
            this.selectId.set(oldChoiceId);
            return;
          }
          const choice = question.choices.find((c) => c.choiceId === choiceId);
          this.result = `${choice?.text} を選択中`;
        }),
      );

    forkJoin([postObserver, timer(2000)]).subscribe(() => {
      this.sending.set(false);
    });
  }
}
