import { Component, computed, input } from '@angular/core';
import { GetQuestionForProjectorRes } from '../../service/api.interface';

@Component({
  selector: 'app-screen-close',
  imports: [],
  templateUrl: './screen-close.component.html',
  styleUrl: './screen-close.component.scss',
})
export class ScreenCloseComponent {
  nowQuestion = input.required<GetQuestionForProjectorRes | undefined>();

  question = computed(() => {
    const q = this.nowQuestion();
    if (q === undefined) return undefined;
    return q;
  });
}
