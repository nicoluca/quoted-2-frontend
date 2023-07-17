import { TestBed } from '@angular/core/testing';

import { QuoteService } from './quote.service';
import { HttpClientModule } from '@angular/common/http';

describe('Quoteservice', () => {
  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
