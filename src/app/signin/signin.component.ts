import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService, isApiError } from '../service/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  router = inject(Router);
  api = inject(ApiService);
  userService = inject(UserService);

  formData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  result = '';
  sending = signal(false);

  ngOnInit() {
    this.formData.valueChanges.subscribe(() => {
      this.result = '';
    });
  }

  submit() {
    this.sending.set(true);
    const data = {
      username: this.formData.value.username ?? '',
      password: this.formData.value.password ?? '',
    };

    this.api.signIn(data).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `${data.error.message} (${data.error.code})`;
        this.sending.set(false);
        return;
      }
      window.location.href = '/';
    });
  }
}
