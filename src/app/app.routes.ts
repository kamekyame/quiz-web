import { Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { FinishComponent } from "./finish/finish.component";

export const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "finish",
    component: FinishComponent,
  },
];
