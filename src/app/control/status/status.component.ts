import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  api = inject(ApiService);

  sendStatus(status: string, questionId?: number) {
    if (status === 'open' && questionId === undefined) return;

    this.api.postStatus({ status, questionId });
  }
}
