import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  httpClient = inject(HttpClient)

  title = 'quiz-web';

  formData = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    inviteCode: new FormControl("")
  })


  submit() {
    console.log(this.formData.value)
    this.httpClient.post("https://nekocatchan-quiz-server-73.deno.dev/signup", this.formData.value, { withCredentials: true }).subscribe((data) => {
      console.log("response data", data)
    })
  }
}
