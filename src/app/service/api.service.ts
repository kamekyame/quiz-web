import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import ENV from '../../environments/environment.json';
import {
  ApiError,
  GetAnswersRes,
  GetMeRes,
  GetQuestionAnswerRes,
  GetQuestionForProjectorRes,
  GetQuestionRes,
  GetRanking,
  PostQuestionAnswerReq,
  PostQuestionReq,
  PostStatusReq,
  SignInReq,
  SignInRes,
  SignUpReq,
  SignUpRes,
  Status,
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
        }),
      );
  }

  /** ログイン */
  signIn(data: SignInReq) {
    return this.httpClient
      .post<SignInRes | ApiError>(this.baseUrl + '/signin', data)
      .pipe(
        tap((res) => {
          if (!isApiError(res)) this.setToken(res.accessToken);
        }),
      );
  }

  signOut() {
    this.removeToken();
    this.post('/signout', null);
  }

  /** 自分の情報取得 */
  getMe() {
    return this.get<GetMeRes>('/me');
  }

  /** 問題取得 */
  getQuestion(id: number) {
    return this.get<GetQuestionRes>('/questions/' + id);
  }

  /** 回答送信 */
  postAnswer(questionId: number, data: PostQuestionAnswerReq) {
    return this.post('/questions/' + questionId + '/answer', data);
  }

  /** 回答取得 */
  getAnswer(questionId: number) {
    return this.get<GetQuestionAnswerRes>(
      '/questions/' + questionId + '/answer',
    );
  }

  /** ステータス送信 */
  postStatus(data: PostStatusReq) {
    return this.post('/status', data);
  }

  /** ステータス取得 */
  getStatus() {
    return this.get<Status>('/status');
  }

  /** 問題の登録（管理画面） */
  postQuestion(data: PostQuestionReq) {
    return this.post('/questions', data);
  }

  getImage(url: string) {
    return this.httpClient.get(url, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      responseType: 'blob',
    });
  }

  /** 問題の取得（プロジェクター用） */
  getQuestionForProjector(id: number) {
    return this.get<GetQuestionForProjectorRes>('/questions/admin/' + id);
  }

  /** すべての回答状況をリセット */
  deleteAnswer() {
    return this.delete('/answers');
  }

  /** すべてのユーザー登録をリセット */
  deleteUser() {
    return this.delete('/deleteUser');
  }

  /** 各選択肢の回答数の取得（プロジェクター用） */
  getAnswers(questionId: number) {
    return this.get<GetAnswersRes>('/questions/' + questionId + '/answers');
  }

  /** ランキングの取得 */
  getRanking() {
    return this.get<GetRanking>("/ranking");
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

  /** 認証付きDELETEリクエスト */
  private delete<T = {}>(path: string) {
    return this.httpClient.delete<T | ApiError>(this.baseUrl + path, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
  }

  private setToken(accessToken: string) {
    localStorage.setItem('token', accessToken);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private removeToken() {
    localStorage.removeItem('token');
  }
}

export function isApiError(data: any): data is ApiError {
  return data && 'error' in data;
}
