import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements AfterViewInit {
  @ViewChild('gallerySection') gallerySection!: ElementRef;

  images = [
    { src: '/images/gallery-sushi.png', alt: 'Premium Sushi Platter', title: 'Sushi Selection' },
    { src: '/images/gallery-wagyu.png', alt: 'Wagyu Beef Steak', title: 'Wagyu Premium' },
    { src: '/images/gallery-ramen.png', alt: 'Tonkotsu Ramen', title: 'Tonkotsu Ramen' },
    { src: '/images/gallery-interior.png', alt: 'Restaurant Interior', title: 'Ambiente' }
  ];

  lightboxImage: any = null;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = this.gallerySection.nativeElement.querySelectorAll('.gallery__item');
    elements.forEach((el: Element) => observer.observe(el));
  }

  openLightbox(image: any) {
    this.lightboxImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxImage = null;
    document.body.style.overflow = '';
  }
}
