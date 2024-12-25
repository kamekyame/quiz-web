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
      const inviteCode = param.get('inviteCode');
      if (inviteCode) {
        this.formData.patchValue({ inviteCode });
        this.formData.get('inviteCode')?.disable();
      }
    });

    this.formData.valueChanges.subscribe(() => {
      this.result = '';
    });
  }

  submit() {
    this.sending.set(true);
    const data = {
      username: this.formData.getRawValue().username ?? '',
      password: this.formData.getRawValue().password ?? '',
      inviteCode: this.formData.getRawValue().inviteCode ?? '',
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
