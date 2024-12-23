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
      });
    });
  }
}
