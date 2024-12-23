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

  /** ユーザー情報 undefined: 初期化前、null: 未ログイン */
  user = signal<User | undefined | null>(undefined);

  /** ユーザー情報取得。取得済みであればそれを返し、未取得であればAPIリクエストする */
  getUser() {
    console.log('getUser');
    const user = this.user();
    if (user !== undefined) return of(user);
    else {
      return this.api.getMe().pipe(
        mergeMap((data) => {
          if (isApiError(data)) {
            this.user.set(null);
            return of(null);
          } else {
            this.user.set(data);
            return of(data);
          }
        }),
      );
    }
  }

  /** サインアウト */
  signout() {
    this.api.signOut();
    this.user.set(null);
  }
}
