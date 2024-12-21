import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  router = inject(Router);
  api = inject(ApiService);
  userService = inject(UserService);

  formData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  result = '';

  submit() {
    console.log(this.formData.value);
    const data = {
      username: this.formData.value.username ?? '',
      password: this.formData.value.password ?? '',
    };

    this.api.signIn(data).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `ログインに失敗しました。${data.error.message} (${data.error.code})`;
        return;
      }
      this.result = 'ログインに成功しました⭐️';
      this.userService.update();
      this.router.navigate(['/']);
    });
  }
}
