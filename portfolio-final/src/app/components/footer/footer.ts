import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { scrollToSection } from '../../shared/scroll-to.util';

@Component({
  selector: 'app-footer',
  imports: [RevealDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  year = new Date().getFullYear();

  goTo(id: string, event: Event): void {
    event.preventDefault();
    scrollToSection(id);
  }
}
