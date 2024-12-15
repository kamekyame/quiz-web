import { Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { WaitingComponent } from "./waiting/waiting.component";

export const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "waiting",
    component: WaitingComponent,
  }
];
