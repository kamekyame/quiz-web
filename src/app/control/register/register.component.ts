import { Component, inject } from '@angular/core';
import { ApiService, isApiError } from '../../service/api.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  api = inject(ApiService);

  formData = new FormGroup({
    questionId: new FormControl(''),
    imageUrl: new FormControl(''),
    choices: new FormGroup({
      choice_1: new FormControl(''),
      choice_2: new FormControl(''),
      choice_3: new FormControl(''),
      choice_4: new FormControl(''),
    }),
    correctChoiceId: new FormControl(''),
  });

  result = '';

  register() {
    const data = {
      questionId: parseInt(this.formData.value.questionId!),
      imageUrl: this.formData.value.imageUrl ?? '',
      choices: [
        { choiceId: 1, text: this.formData.value.choices?.choice_1 ?? '' },
        { choiceId: 2, text: this.formData.value.choices?.choice_2 ?? '' },
        { choiceId: 3, text: this.formData.value.choices?.choice_3 ?? '' },
        { choiceId: 4, text: this.formData.value.choices?.choice_4 ?? '' },
      ],
      correctChoiceId: parseInt(this.formData.value.correctChoiceId!),
    };

    this.api.postQuestion(data).subscribe((data) => {
      if (isApiError(data)) {
        this.result = `問題の登録に失敗しました。${data.error.message} (${data.error.code})`;
        return;
      }
      this.result = '問題を登録しました';
    });
  }

  get choices(): FormGroup {
    return this.formData.get('choices') as FormGroup;
  }
}
