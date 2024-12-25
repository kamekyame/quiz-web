import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';
import {
  GetAnswersRes,
  GetQuestionForProjectorRes,
  Status,
} from '../../service/api.interface';
import { AuthImageDirective } from '../../directive/auth-image.directive';

@Component({
  selector: 'app-screen-question',
  imports: [AuthImageDirective],
  templateUrl: './screen-question.component.html',
  styleUrl: './screen-question.component.scss',
})
export class ScreenQuestionComponent {
  api = inject(ApiService);

  nowStatus = input.required<Status>();

  isOpen = computed(() => {
    const s = this.nowStatus();
    if (s.status === 'open') return true;
    else return false;
  });

  questionId = computed(() => {
    const s = this.nowStatus();
    if (s.status === 'open' || s.status === 'close') {
      return s.questionId;
    } else {
      return undefined;
    }
  });

  question = signal<GetQuestionForProjectorRes | undefined>(undefined);

  answers = signal<GetAnswersRes | undefined>(undefined);

  result: string | undefined;
  isShowAnswer = signal<boolean>(false);

  constructor() {
    effect(() => {
      const id = this.questionId();
      if (id === undefined) return;
      this.answers.set(undefined);
      this.isShowAnswer.set(false);
      this.api.getQuestionForProjector(id).subscribe((data) => {
        if (isApiError(data)) {
          this.result = `${data.error.message} (${data.error.code})`;
          return;
        }
        this.question.set(data);
      });
    });

    effect(() => {
      const isOpen = this.isOpen();
      if (!isOpen) {
        if (this.questionId() !== undefined) {
          this.getAnswers(this.questionId()!);
        }
      }
    });
  }

  getAnswers(questionId: number) {
    this.api.getAnswers(questionId).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        return;
      }
      this.answers.set(data);
    });
  }

  // 選択肢の回答数を取得
  // サーバー空のレスポンスに回答データが存在しないときは 0 を返す
  getCount(choiceId: number) {
    const answers = this.answers();
    if (answers === undefined) return 0;
    const answer = answers.answers.find((a) => a.choiceId === choiceId);

    return answer ? answer.count : 0;
  }

  showAnswers() {
    this.isShowAnswer.set(true);
  }
}
