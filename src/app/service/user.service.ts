import { inject, Injectable, signal } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { ApiService, isApiError } from './api.service';

export type User = {
  username: string;
  role: string;
};

/** ユーザー情報を管理するサービス */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = inject(ApiService);

  /** ユーザー情報　undefined: 初期化前、null: 未ログイン */
  user = signal<User | undefined | null>(undefined);

  constructor() {
    // 初期化時にログイン状態を確認
    this.update().subscribe();
  }

  /** ユーザー情報更新 */
  update() {
    // エラーだったら未ログイン、データが帰ってきたらログイン済み
    return this.api.getMe().pipe(
      mergeMap((data) => {
        if (isApiError(data)) {
          this.user.set(null);
          return of(undefined);
        } else {
          this.user.set(data);
          return of(data);
        }
      }),
    );
  }

  /** サインアウト */
  signout() {
    this.api.signOut();
    this.user.set(null);
  }
}
