import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricaoListaComponent } from './nutricao-lista.component';

describe('NutricaoListaComponent', () => {
  let component: NutricaoListaComponent;
  let fixture: ComponentFixture<NutricaoListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutricaoListaComponent]
    });
    fixture = TestBed.createComponent(NutricaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
