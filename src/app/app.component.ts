import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
}
