import { TestBed, inject } from '@angular/core/testing';

import { AngularFormsService } from './angular-forms.service';

describe('AngularFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFormsService]
    });
  });

  it('should be created', inject([AngularFormsService], (service: AngularFormsService) => {
    expect(service).toBeTruthy();
  }));
});
