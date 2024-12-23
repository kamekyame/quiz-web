import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  userService = inject(UserService);

  formData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    inviteCode: new FormControl(''),
  });

  result = '';
  sending = signal(false);

  ngOnInit() {
    this.route.queryParamMap.subscribe((param) => {
      this.formData.patchValue({ inviteCode: param.get('inviteCode') ?? '' });
      this.formData.get('inviteCode')?.disable();
    });

    this.formData.valueChanges.subscribe(() => {
      this.result = '';
    });
  }

  submit() {
    this.sending.set(true);
    const data = {
      username: this.formData.value.username ?? '',
      password: this.formData.value.password ?? '',
      inviteCode: this.formData.value.inviteCode ?? '',
    };

    this.api.signUp(data).subscribe((res) => {
      if (isApiError(res)) {
        this.result = `${res.error.message}（${res.error.code}）`;
        this.sending.set(false);
        return;
      }
      window.location.href = '/';
    });
  }
}
