import { TestBed } from '@angular/core/testing';

import { SourceService } from './source.service';
import { HttpClientModule } from '@angular/common/http';

describe('SourceService', () => {
  let service: SourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  });
