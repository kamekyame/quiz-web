import { Injectable } from '@angular/core';
import { fromEvent, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectorService {
  private targetWindow: Window | null = null;

  serviceEnable() {
    return this.targetWindow !== null;
  }

  setWindow(window: Window | null) {
    this.targetWindow = window;
  }

  postMessage(message: string) {
    if (this.targetWindow === null) return;
    this.targetWindow.postMessage(message, window.location.origin);
  }

  messageEvent() {
    return fromEvent<MessageEvent>(window, 'message').pipe(
      mergeMap((event) => {
        if (event.origin !== window.location.origin) return [];
        if (typeof event.data !== 'string') return [];
        return [event.data];
      }),
    );
  }
}
