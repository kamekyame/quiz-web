import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import ENV from '../../environments/environment.json';
import {
  ApiError,
  GetQuestionRes,
  PostQuestionAnswerReq,
  SignInReq,
  SignInRes,
  SignUpReq,
  SignUpRes,
} from './api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  baseUrl = ENV.API_BASE;

  /** 新規登録 */
  signUp(data: SignUpReq) {
    return this.httpClient
      .post<SignUpRes | ApiError>(this.baseUrl + '/signup', data)
      .pipe(
        tap((res) => {
          if (!isApiError(res)) this.setToken(res.accessToken);
        })
      );
  }

  /** ログイン */
  signIn(data: SignInReq) {
    return this.httpClient
      .post<SignInRes | ApiError>(this.baseUrl + '/signin', data)
      .pipe(
        tap((res) => {
          if (!isApiError(res)) this.setToken(res.accessToken);
        })
      );
  }

  /** 問題取得 */
  getQuestion(id: number) {
    return this.get<GetQuestionRes>('/questions/' + id);
  }

  /** 問題送信 */
  postAnswer(questionId: number, data: PostQuestionAnswerReq) {
    return this.post('/questions/' + questionId + '/answer', data);
  }

  /** 認証付きGETリクエスト */
  private get<T = {}>(path: string) {
    return this.httpClient.get<T | ApiError>(this.baseUrl + path, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  /** 認証付きPOSTリクエスト */
  private post<T = {}>(path: string, body: any | null) {
    return this.httpClient.post<T | ApiError>(this.baseUrl + path, body, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  private setToken(accessToken: string) {
    localStorage.setItem('token', accessToken);
  }

  private getToken() {
    return localStorage.getItem('token');
  }
}

export function isApiError(data: any): data is ApiError {
  return 'error' in data;
}
