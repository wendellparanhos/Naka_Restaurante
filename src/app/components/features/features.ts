import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {
  activeIngredient: string | null = null;

  ingredients = [
    {
      id: 'wagyu',
      kanji: '和牛',
      name: 'Wagyu A5',
      image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?q=80&w=1600'
    },
    {
      id: 'bluefin',
      kanji: 'クロマグロ',
      name: 'Bluefin',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1600'
    },
    {
      id: 'koshihikari',
      kanji: 'コシヒカリ',
      name: 'Koshihikari',
      image: 'https://images.unsplash.com/photo-1606555198089-e15fcb60d4b9?q=80&w=1600'
    }
  ];

  setActive(id: string) {
    this.activeIngredient = id;
  }

  clearActive() {
    this.activeIngredient = null;
  }
}
