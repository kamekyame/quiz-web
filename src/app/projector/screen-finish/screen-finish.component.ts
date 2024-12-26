import { AfterViewInit, Component, computed, effect, ElementRef, inject, input, signal } from '@angular/core';
import { gsap } from "gsap";
import { ApiService, isApiError } from '../../service/api.service';
import { GetRanking } from '../../service/api.interface';

@Component({
  selector: 'app-screen-finish',
  imports: [],
  templateUrl: './screen-finish.component.html',
  styleUrl: './screen-finish.component.scss'
})
export class ScreenFinishComponent implements AfterViewInit {

  api = inject(ApiService);

  ranking = signal<GetRanking | undefined>(undefined);
  toprank = computed(()=>this.ranking()?.ranking.slice(0,10))

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



  ngAfterViewInit() {
    console.log(this.ranking());
    setTimeout(() => {
      this.animate();
    }, 2000);
  }

  animate() {

    console.log("animate")
    gsap.utils.toArray(".rank").forEach((target: any, index: number) => {
      const child = target.querySelector(".text")
      gsap.fromTo(target, { rotateX: 180 }, {
        rotateX: 0,
        ease: 'power2.inOut',
        delay: 5 - 1 * index,
        duration: 1,
        onStart: () => {
          gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.5 });
        }

      });

    });

  }



}
