import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent {

  constructor(private router: Router) { }
  user = [
    { nome: 'Ana', email: 'ana@example.com', funcao: 'Professor' },
    { nome: 'Carlos', email: 'carlos@example.com', funcao: 'Professor' },
    { nome: 'Diego', email: 'carlos@example.com', funcao: 'Aluno' },
    { nome: 'Leonardo', email: 'carlos@example.com', funcao: 'Aluno' },
    { nome: 'Maria', email: 'carlos@example.com', funcao: 'Aluno' }
  ];

  usuarioSelecionado: any;


  editarUsuario(user: any): void {
    this.usuarioSelecionado = user;
    this.router.navigate(['/app/editUser', { user: JSON.stringify(user) }]); // Supondo que o ID do usuário seja 'id'
  }

  salvarEdicao(user: any) {
    user.editing = false;
  }

  deletarUsuario(user: any) {
    const index = this.user.indexOf(user);
    if (index !== -1) {
      this.user.splice(index, 1);
    }
  }

  incluirUsuario() {
    this.router.navigate(['/app/addUser']);
  }
}
