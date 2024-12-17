import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-control',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {}
