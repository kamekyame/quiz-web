import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  api = inject(ApiService);

  result: string | undefined;

  deleteUser() {
    if (!window.confirm('全てのユーザー登録をリセットしますか？')) return;
    if (!window.confirm('この操作は取り消せません。本当によろしいですか？'))
      return;

    this.api.deleteUser().subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        return;
      }
      this.result = 'すべてのユーザー登録をリセットしました';
    });
  }
}
