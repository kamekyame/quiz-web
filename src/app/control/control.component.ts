import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';

@Component({
  selector: 'app-control',
  imports: [RegisterComponent, StatusComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {}
