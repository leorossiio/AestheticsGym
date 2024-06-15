import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricaoCadastroComponent } from './nutricao-cadastro.component';

describe('NutricaoCadastroComponent', () => {
  let component: NutricaoCadastroComponent;
  let fixture: ComponentFixture<NutricaoCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutricaoCadastroComponent]
    });
    fixture = TestBed.createComponent(NutricaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
