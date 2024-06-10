import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlunoComponent } from './lista-aluno.component';

describe('ListaAlunoComponent', () => {
  let component: ListaAlunoComponent;
  let fixture: ComponentFixture<ListaAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAlunoComponent]
    });
    fixture = TestBed.createComponent(ListaAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
