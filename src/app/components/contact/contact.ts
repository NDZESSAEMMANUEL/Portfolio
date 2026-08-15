import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contacts } from '../../Service/contact';
import { RevealDirective } from '../../shared/reveal.directive';
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  private fb = inject(FormBuilder);
  private contact = inject(Contacts);

  linkdin = signal<string>("https://www.linkedin.com/in/emmanuel-fredy-ndzessa-873996321")
  numero = signal<string>("+237 677 939 020")
  email= signal<string>("fredy.ndzessa@fasciences-uy1.cm")
  github = signal<string>("https://github.com/NDZESSAEMMANUEL")
  nom    =signal<string>('Emmanuel Fredy')














  status = signal<'idle' | 'sending' | 'ok' | 'error'>('idle');
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    objet: [''],
    website: [''],
  });
  submit() {
    if (this.form.invalid) return;
    this.status.set('sending');
    this.contact.send(this.form.getRawValue() as any).subscribe({
      next: () => { this.status.set('ok'); this.form.reset(); },
      error: () => this.status.set('error'),
    });
  }
}

