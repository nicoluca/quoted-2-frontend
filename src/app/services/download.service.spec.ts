import { TestBed } from '@angular/core/testing';

import { DownloadService } from './download.service';
import { HttpClientModule } from '@angular/common/http';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
