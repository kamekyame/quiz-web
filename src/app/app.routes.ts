import { CanActivateFn, Router, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FinishComponent } from './finish/finish.component';
import { WaitingComponent } from './waiting/waiting.component';
import { ControlComponent } from './control/control.component';
import { RegisterComponent } from './control/register/register.component';
import { StatusComponent } from './control/status/status.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';
import { inject } from '@angular/core';
import { UserService } from './service/user.service';
import { mergeMap, of } from 'rxjs';

const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  return userService.getUser().pipe(
    mergeMap((data) => {
      if (data?.role === 'ADMIN') return of(true);
      else return of(false);
    }),
  );
};

const loginGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.getUser().pipe(
    mergeMap((data) => {
      if (data) return of(true);
      else {
        return of(router.parseUrl('signup'));
      }
    }),
  );
};

export const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    children: [
      {
        path: '',
        component: PlayerComponent,
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
        canActivate: [adminGuard],
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
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  { path: '**', redirectTo: '/' },
];
