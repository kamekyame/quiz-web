import { Component, inject, input } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { GetQuestionRes } from '../service/api.interface';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class RankingComponent {
  api = inject(ApiService);

  id = input.required<number>();

  question: GetQuestionRes | undefined;

  result: string | undefined;

  ngOnInit() {
    this.api.getQuestion(this.id()).subscribe((data) => {
      if (isApiError(data)) {
        console.error('問題が取得できませんでした');
        return;
      }
      this.question = data;
      console.log(data);
    });
  }

  sendAnswer(choiceId: number) {
    if (!this.question) return;
    this.api
      .postAnswer(this.question.questionId, { choiceId })
      .subscribe((data) => {
        if (isApiError(data)) {
          // エラー処理
          this.result = `${data.error.message}（${data.error.code}）`;
          return;
        }
        this.result = `解答${choiceId} を送信しました。`;
      });
  }
}
