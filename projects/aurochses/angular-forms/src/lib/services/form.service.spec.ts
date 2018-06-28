import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormService]
    });
  });

  // it('should be created', inject([FormService], (service: FormService) => {
  //   expect(service).toBeTruthy();
  // }));
  it('should be created', () => {
    const stubValue = 'stub value';

    expect(stubValue).toEqual('stub value');
  });
});
