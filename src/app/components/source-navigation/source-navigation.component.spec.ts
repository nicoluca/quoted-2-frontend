import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceNavigationComponent } from './source-navigation.component';

describe('SourceNavigationComponent', () => {
  let component: SourceNavigationComponent;
  let fixture: ComponentFixture<SourceNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceNavigationComponent]
    });
    fixture = TestBed.createComponent(SourceNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
