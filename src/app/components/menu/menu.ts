import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface MenuItem {
  name: string;
  price: string;
  image?: string;
  category: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements AfterViewInit {
  @ViewChild('hoverReveal') hoverReveal!: ElementRef;

  currentHoverImage: string | undefined = undefined;
  isMobile = false;
  activeCategory = 'Todos';

  categories = ['Todos', 'Entradas', 'Pratos Principais', 'Drinks'];

  allMenuItems: MenuItem[] = [
    { name: 'Edamame Trufado', price: 'R$ 45', image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=600', category: 'Entradas' },
    { name: 'Carpaccio de Salmão', price: 'R$ 78', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600', category: 'Entradas' },
    { name: 'Black Cod Miso', price: 'R$ 165', image: 'https://images.unsplash.com/photo-1581184953963-d15971588569?q=80&w=600', category: 'Pratos Principais' },
    { name: 'Wagyu A5 na Pedra', price: 'R$ 390', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600', category: 'Pratos Principais' },
    { name: 'Omakase Premium', price: 'R$ 220', image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=600', category: 'Pratos Principais' },
    { name: 'Sakura Martini', price: 'R$ 55', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600', category: 'Drinks' },
    { name: 'Tuna Tataki', price: 'R$ 82', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600', category: 'Entradas' },
    { name: 'Lychee Martini', price: 'R$ 48', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600', category: 'Drinks' }
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor() {
    this.filteredMenuItems = this.allMenuItems;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.hoverReveal && this.currentHoverImage && !this.isMobile) {
      gsap.to(this.hoverReveal.nativeElement, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    if (cat === 'Todos') {
      this.filteredMenuItems = this.allMenuItems;
    } else {
      this.filteredMenuItems = this.allMenuItems.filter(item => item.category === cat);
    }
  }

  onMenuHover(item: MenuItem, event: MouseEvent) {
    if (item.image && !this.isMobile && this.hoverReveal) {
      this.currentHoverImage = item.image;
      gsap.set(this.hoverReveal.nativeElement, { left: event.clientX, top: event.clientY });
      gsap.to(this.hoverReveal.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  }

  onMenuLeave() {
    if (this.hoverReveal && !this.isMobile) {
      gsap.to(this.hoverReveal.nativeElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.currentHoverImage = undefined;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.isMobile = window.innerWidth <= 768;
  }
}
