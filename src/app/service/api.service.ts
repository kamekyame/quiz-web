import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import ENV from "../../environments/environment.json";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  baseUrl = ENV.API_BASE;

  /** 新規登録 */
  signUp(data: SignUpReq): Observable<SignUpRes> {
    return this.httpClient.post<SignUpRes>(this.baseUrl + "/signup", data, {
      withCredentials: true,
    });
  }
}
