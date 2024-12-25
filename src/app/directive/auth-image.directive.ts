import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ApiService } from '../service/api.service';
import ENV from '../../environments/environment.json';

/**
 * 画像のリクエストに Authorization ヘッダを付与するためのディレクティブ
 * 外部へのアクセスの場合はそのまま表示する
 */
@Directive({
  selector: 'img[appAuthSrc]',
})
export class AuthImageDirective {
  el = inject<ElementRef<HTMLImageElement>>(ElementRef);
  apiService = inject(ApiService);

  appAuthSrc = input.required<string>();

  constructor() {
    effect(() => {
      const url = this.appAuthSrc();
      // サーバー以外へのアクセスならそのまま表示（トークンを送らないようにするため）
      if (!url.includes(ENV.API_BASE)) {
        this.el.nativeElement.src = url;
        return;
      } else {
        // 読み込みまでの間は白単色のダミー画像を表示（でないと blokenicon が出てしまう）
        this.el.nativeElement.src =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4////fwAJ+wP9BUNFygAAAABJRU5ErkJggg==';
      }
      this.apiService.getImage(url).subscribe((res) => {
        this.el.nativeElement.src = URL.createObjectURL(res);
      });
    });
  }
}
