import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  baseUrl = "https://nekocatchan-quiz-server-73.deno.dev"
  signUp(data: SignUpReq): Observable<SignUpRes> {
    return this.httpClient.post<SignUpRes>(this.baseUrl + "/signup", data, { withCredentials: true })
  }

}
