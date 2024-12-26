import { AfterViewInit, Component, computed, effect, ElementRef, inject, input, OnDestroy, signal, ViewChild } from '@angular/core';
import { gsap } from "gsap";
import { ApiService, isApiError } from '../../service/api.service';
import { GetRanking } from '../../service/api.interface';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-screen-finish',
  imports: [],
  templateUrl: './screen-finish.component.html',
  styleUrl: './screen-finish.component.scss'
})
export class ScreenFinishComponent implements AfterViewInit, OnDestroy {

  api = inject(ApiService);

  ranking = signal<GetRanking | undefined>(undefined);
  toprank = computed(() => this.ranking()?.ranking.slice(0, 10))


  subscription = new Subscription();

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


    this.subscription.add(
      fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
        console.log(event);
        if (event.key === 's') {
          // show の s
          this.animate();
        }
      }),

    );
    this.subscription.add(
      fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
        console.log(event);
        if (event.key === '3') {
          // 3位の3
          this.threeAnimate();
        }
      }),

    );
    this.subscription.add(
      fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
        console.log(event);
        if (event.key === '2') {
          // 2位の2
          this.twoAnimate();
        }
      }),

    );
    this.subscription.add(
      fromEvent<KeyboardEvent>(window, 'keydown').subscribe((event) => {
        console.log(event);
        if (event.key === '1') {
          // 1位の1
          this.topAnimate();
        }
      }),

    );






  }

  loadflag = false
  topflag = false




  ngAfterViewInit() {
    console.log(this.ranking());
    setTimeout(() => {
      this.loadflag = true
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  animate() {
    if (this.loadflag === true) {
      console.log("animate")
      this.loadflag = false
      gsap.utils.toArray(".rank").forEach((target: any, index: number) => {
        if (index > 2) {
          const child = target.querySelector(".text")
          gsap.fromTo(target, { rotateX: 180 }, {
            rotateX: 0,
            ease: 'power2.inOut',
            delay: 10 - 1 * index,
            duration: 0.5,
            onStart: () => {
              gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.2 });
            },
            onComplete: () => { this.topflag = true }
          });
        }
      });
    }
  }

  topAnimate() {
    if (this.topflag === true) {

      const target = document.getElementById("rank1")
      const child = target!.querySelector(".text")

      gsap.fromTo("#rank1", { rotateX: 180 }, {
        rotateX: 0,
        ease: 'power2.inOut',
        duration: 1,
        onStart: () => {
          gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.5 });
        }
      });

    }
  }

  twoAnimate() {
    if (this.topflag === true) {

      const target = document.getElementById("rank2")
      const child = target!.querySelector(".text")

      gsap.fromTo("#rank2", { rotateX: 180 }, {
        rotateX: 0,
        ease: 'power2.inOut',
        duration: 1,
        onStart: () => {
          gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.5 });
        }
      });

    }
  }

  threeAnimate() {
    if (this.topflag === true) {

      const target = document.getElementById("rank3")
      const child = target!.querySelector(".text")

      gsap.fromTo("#rank3", { rotateX: 180 }, {
        rotateX: 0,
        ease: 'power2.inOut',
        duration: 1,
        onStart: () => {
          gsap.fromTo(child, { opacity: 0 }, { opacity: 1, delay: 0.5 });
        }
      });

    }
  }






}
