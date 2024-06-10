import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMidComponent } from './home-mid.component';

describe('HomeMidComponent', () => {
  let component: HomeMidComponent;
  let fixture: ComponentFixture<HomeMidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMidComponent]
    });
    fixture = TestBed.createComponent(HomeMidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
