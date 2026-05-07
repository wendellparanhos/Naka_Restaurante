import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit {
  @ViewChild('heroContent') heroContent!: ElementRef;

  ngAfterViewInit() {
    this.heroContent.nativeElement.style.opacity = '1';
    
    // Avant-Garde GSAP Animation
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline();
      
      tl.from('.hero__bg-text', {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'power4.out'
      })
      .from('.hero__image-wrapper', {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1.5,
        ease: 'power4.inOut'
      }, '-=1.5')
      .from('.hero__image', {
        scale: 1.5,
        duration: 2,
        ease: 'power3.out'
      }, '-=1.5')
      .from('.hero__badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=1')
      .from('.hero__title-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero__subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero__actions', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero__scroll-indicator', {
        opacity: 0,
        duration: 1
      }, '-=0.5');

    }, this.heroContent.nativeElement.parentElement);
  }
}
