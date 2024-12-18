import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  imageSrc = '';
  reader = new FileReader();

  onChange(event: any) {
    const file: File = event.target.files[0];
    this.reader.onload = (e: any) => {
      if (e === null) return;
      this.imageSrc = e.target['result'];
    };
    this.reader.readAsDataURL(file);
  }
}
