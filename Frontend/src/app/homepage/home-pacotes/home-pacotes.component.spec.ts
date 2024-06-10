import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePacotesComponent } from './home-pacotes.component';

describe('HomePacotesComponent', () => {
  let component: HomePacotesComponent;
  let fixture: ComponentFixture<HomePacotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePacotesComponent]
    });
    fixture = TestBed.createComponent(HomePacotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
