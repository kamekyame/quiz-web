import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { DeleteComponent } from './delete/delete.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-control',
  imports: [
    RegisterComponent,
    StatusComponent,
    DeleteComponent,
    DeleteUserComponent,
  ],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {}
