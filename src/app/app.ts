import { Component, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Lenis from 'lenis';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Features } from './components/features/features';
import { Gallery } from './components/gallery/gallery';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Hero,
    About,
    Features,
    Menu,
    Gallery,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  title = 'naka-restaurante';
  showSplash = true;
  fadeSplash = false;

  @ViewChild('customCursor') customCursor!: ElementRef;
  @ViewChild('scrollProgress') scrollProgress!: ElementRef;

  ngAfterViewInit() {
    // 1. Splash Screen Logic
    setTimeout(() => {
      this.fadeSplash = true;
      setTimeout(() => {
        this.showSplash = false;
      }, 800); // Match CSS transition
    }, 2500);

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3. Scroll Progress Indicator
    lenis.on('scroll', (e: any) => {
      const progress = e.progress;
      if (this.scrollProgress) {
        this.scrollProgress.nativeElement.style.transform = `scaleX(${progress})`;
      }
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.customCursor) {
      this.customCursor.nativeElement.style.left = e.clientX + 'px';
      this.customCursor.nativeElement.style.top = e.clientY + 'px';
    }
  }
}
