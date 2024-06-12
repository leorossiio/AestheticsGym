import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent {

  constructor(private router: Router) { }

  users = [
    { nome: 'Ana', email: 'ana@example.com', funcao: 'Professor', isEditing: false },
    { nome: 'Carlos', email: 'carlos@example.com', funcao: 'Professor', isEditing: false },
    { nome: 'Diego', email: 'diego@example.com', funcao: 'Aluno', isEditing: false },
    { nome: 'Leonardo', email: 'leonardo@example.com', funcao: 'Aluno', isEditing: false },
    { nome: 'Maria', email: 'maria@example.com', funcao: 'Aluno', isEditing: false }
  ];

  usuarioSelecionado: any;

  toggleEdit(user: any): void {
    if (user.isEditing) {
      // Save changes
      this.salvarEdicao(user);
    }
    user.isEditing = !user.isEditing;
  }

  salvarEdicao(user: any) {
    // Here you can call a service to save the changes to the backend
    console.log('User saved:', user);
  }

  deletarUsuario(user: any) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
