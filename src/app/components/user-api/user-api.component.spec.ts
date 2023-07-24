import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiComponent } from './user-api.component';

describe('UserApiComponent', () => {
  let component: UserApiComponent;
  let fixture: ComponentFixture<UserApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserApiComponent]
    });
    fixture = TestBed.createComponent(UserApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
