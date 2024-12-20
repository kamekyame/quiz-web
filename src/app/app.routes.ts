import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FinishComponent } from './finish/finish.component';
import { WaitingComponent } from './waiting/waiting.component';
import { ControlComponent } from './control/control.component';
import { RegisterComponent } from './control/register/register.component';
import { StatusComponent } from './control/status/status.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';

export const routes: Routes = [
  { path: '', component: PlayerComponent },
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
    path: 'control',
    component: ControlComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'status',
        component: StatusComponent,
      },
    ],
  },
  {
    path: 'projector',
    component: ProjectorComponent,
  },
];
