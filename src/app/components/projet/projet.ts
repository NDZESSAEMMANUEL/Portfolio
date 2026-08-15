import { Component , signal} from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projet',
  imports: [RevealDirective],
  templateUrl: './projet.html',
  styleUrl: './projet.css',
})
export class Projet {

  github1 = signal<string>("https://github.com/NDZESSAEMMANUEL/EatSafe")
  github2 = signal<string>("https://github.com/NDZESSAEMMANUEL/CivilPass")
  github3 = signal<string>("https://github.com/ECOACTIONS/EcoActionBackend/tree/main/backend")
}
