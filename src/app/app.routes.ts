import { Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { FinishComponent } from "./finish/finish.component";
import { WaitingComponent } from "./waiting/waiting.component";
import { ControlComponent } from "./control/control.component";

export const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "finish",
    component: FinishComponent,
  },
  {
    path: "waiting",
    component: WaitingComponent,
  },
  {
    path: "control",
    component: ControlComponent,
  },
];
