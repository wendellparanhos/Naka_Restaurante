import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  images = [
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200',
    'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1200',
    'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=1200',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200',
    'https://images.unsplash.com/photo-1581184953963-d15971588569?q=80&w=1200'
  ];

  isLightboxOpen = false;
  activeIndex = 0;
  currentIndex = 0; // For lightbox

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  openLightbox(index: number) {
    if (index !== this.activeIndex) return; // Only allow opening the active centered item
    this.currentIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.style.overflow = 'auto';
  }

  prevImage() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  ngAfterViewInit() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.addEventListener('scroll', () => {
        this.updateActiveIndex();
      });
      // Initialize
      this.updateActiveIndex();
    }
  }

  updateActiveIndex() {
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const centerPoint = scrollLeft + (container.clientWidth / 2);
    
    const items = container.querySelectorAll('.gallery__item');
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item: HTMLElement, index: number) => {
      const itemCenter = item.offsetLeft + (item.clientWidth / 2);
      const distance = Math.abs(centerPoint - itemCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (this.activeIndex !== closestIndex) {
      this.activeIndex = closestIndex;
    }
  }
}
