import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';
import {
  GetQuestionForProjectorRes,
  Status,
} from '../../service/api.interface';

@Component({
  selector: 'app-screen-open',
  imports: [],
  templateUrl: './screen-open.component.html',
  styleUrl: './screen-open.component.scss',
})
export class ScreenOpenComponent {
  api = inject(ApiService);

  nowStatus = input.required<Status>();
  nowQuestion = output<GetQuestionForProjectorRes>();

  questionId = computed(() => {
    const s = this.nowStatus();
    if (s.status === 'open' || s.status === 'close') {
      return s.questionId;
    } else {
      return undefined;
    }
  });

  question = signal<GetQuestionForProjectorRes | undefined>(undefined);

  result: string | undefined;

  constructor() {
    effect(() => {
      const id = this.questionId();
      if (id === undefined) return;
      this.api.getQuestionForProjector(id).subscribe((data) => {
        if (isApiError(data)) {
          this.result = `${data.error.message} (${data.error.code})`;
          return;
        }
        this.question.set(data);
        this.nowQuestion.emit(data);
      });
    });
  }
}
