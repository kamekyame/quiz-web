import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FinishComponent } from './finish/finish.component';
import { WaitingComponent } from './waiting/waiting.component';
import { QuestionComponent } from './question/question.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'finish',
    component: FinishComponent,
  },
  {
    path: 'waiting',
    component: WaitingComponent,
  },
  {
    path: 'question/:id',
    component: QuestionComponent,
  },
];
