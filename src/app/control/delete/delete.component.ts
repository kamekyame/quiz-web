import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  api = inject(ApiService);

  result: string | undefined;

  deleteAnswers() {
    if (!window.confirm('全ての回答状況をリセットしますか？')) return;
    if (!window.confirm('この操作は取り消せません。本当によろしいですか？'))
      return;

    this.api.deleteAnswer().subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        return;
      }
      this.result = 'すべての回答状況をリセットしました';
    });
  }
}
