import { Component, computed, effect, ElementRef, inject, input, signal, ViewChild, ViewChildren } from '@angular/core';

import { gsap } from "gsap";
import { ApiService, isApiError } from '../../service/api.service';
import { GetRanking } from '../../service/api.interface';

@Component({
  selector: 'app-screen-finish',
  imports: [],
  templateUrl: './screen-finish.component.html',
  styleUrl: './screen-finish.component.scss'
})
export class ScreenFinishComponent {

  api = inject(ApiService);

  ranking = signal<GetRanking | undefined>(undefined);

  result: string | undefined;

  constructor() {
    effect(() => {
      this.api.getRanking().subscribe((data) => {
        if (isApiError(data)) {
          this.result = `${data.error.message} (${data.error.code})`;
          return;
        }
        this.ranking.set(data);
      });
    });
  }




  ngOnInit() {
    this.animateBox();
    console.log(this.ranking());
  }

  animateBox() {
    gsap.utils.toArray(".rank").forEach((target: any, index: number) => {
      const child = target.querySelector(".text")
      console.log(child)
      gsap.fromTo(target, { rotateX: 180 }, {
        rotateX: 0,
        ease: 'power2.inOut',
        delay: 5 - 1 * index,
        duration: 1,
        onStart: () => {
          gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.5 });
        }

      });

      // 〜アニメーション内容〜
    });

  }



}
