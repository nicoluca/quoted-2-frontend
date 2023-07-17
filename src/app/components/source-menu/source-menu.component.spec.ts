import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMenuComponent } from './source-menu.component';
import { HttpClientModule } from '@angular/common/http';

describe('SourceMenuComponent', () => {
  let component: SourceMenuComponent;
  let fixture: ComponentFixture<SourceMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceMenuComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(SourceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
