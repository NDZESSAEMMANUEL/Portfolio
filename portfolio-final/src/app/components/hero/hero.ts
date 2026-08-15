import { Component } from '@angular/core';
import { scrollToSection } from '../../shared/scroll-to.util';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  goTo(id: string, event: Event): void {
    event.preventDefault();
    scrollToSection(id);
  }
}
