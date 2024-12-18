import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  api = inject(ApiService);
  userService = inject(UserService);

  formData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    inviteCode: new FormControl(''),
  });

  result = '';

  submit() {
    console.log(this.formData.value);
    const data = {
      username: this.formData.value.username ?? '',
      password: this.formData.value.password ?? '',
      inviteCode: this.formData.value.inviteCode ?? '',
    };

    this.api.signUp(data).subscribe((res) => {
      if (isApiError(res)) {
        this.result = `新規登録に失敗しました。${res.error.message}（${res.error.code}）`;
        return;
      }
      this.result = data.username + ' で新規登録が完了しました🎉';
      this.userService.update();
    });
  }
}
