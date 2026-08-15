import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Contacts } from './contact';

describe('Contacts', () => {
  let service: Contacts;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(Contacts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
