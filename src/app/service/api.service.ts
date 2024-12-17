import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  signUp(data: SignUpReq): Observable<SignUpRes | ApiError> {
    return this.httpClient.post<SignUpRes | ApiError>(
      this.baseUrl + '/signup',
      data,
      {
        withCredentials: true,
      }
    );
  }

  /** ログイン */
  signIn(data: SignInReq): Observable<SignInRes | ApiError> {
    return this.httpClient.post<SignInReq>(this.baseUrl + '/signin', data, {
      withCredentials: true,
    });
  }

  /** 問題取得 */
  getQuestion(id: number): Observable<GetQuestionRes | ApiError> {
    // いったんダミーのデータ
    return of({
      questionId: id,
      imageUrl: 'https://placehold.jp/150x150.png',
      choices: [
        {
          choiceId: 1,
          text: 'フライパン',
        },
        {
          choiceId: 2,
          text: 'フランスパン',
        },
        {
          choiceId: 3,
          text: '食パン',
        },
        {
          choiceId: 4,
          text: '肩パン',
        },
      ],
      correctChoiceId: 1,
    });
    // return this.httpClient.get<GetQuestionRes | ApiError>(
    //   this.baseUrl + "/questions/" + id,
    //   {
    //     withCredentials: true,
    //   },
    // );
  }

  postAnswer(questionId: number, data: PostQuestionAnswerReq) {
    return of({});
    // return this.httpClient.post<ApiError>(
    //   this.baseUrl + '/questions/' + questionId + '/answer',
    //   data,
    //   { withCredentials: true }
    // );
  }
}

export function isApiError(data: any): data is ApiError {
  return 'error' in data;
}
