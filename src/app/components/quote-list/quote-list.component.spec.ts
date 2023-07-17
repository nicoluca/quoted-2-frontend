import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListComponent } from './quote-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

describe('QuoteListComponent', () => {
  let component: QuoteListComponent;
  let fixture: ComponentFixture<QuoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteListComponent],
      imports: [HttpClientModule, RouterTestingModule, NgbPagination]
    });
    fixture = TestBed.createComponent(QuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
