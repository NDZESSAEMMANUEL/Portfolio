import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Hero } from '../hero/hero';
import { Projet } from '../projet/projet';
import { Skills } from '../skills/skills';

@Component({
  selector: 'app-main',
  imports: [Header, Footer, About, Contact, Hero, Projet, Skills],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
