import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/usuario.service';

@Component({
  selector: 'app-lista-aluno',
  templateUrl: './lista-aluno.component.html',
  styleUrls: ['./lista-aluno.component.css']
})
  
export class ListaAlunoComponent implements OnInit {
    users: any[] = []; // Inicializando como um array vazio
  
    constructor(private userService: UserService) {}
  
    ngOnInit(): void {
      this.carregarUsuarios();
    }
  
    carregarUsuarios(): void {
      this.userService.listarUsuarios().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          console.error('Erro ao carregar usuários:', error);
        }
      );
    }
  
    toggleEdit(user: any): void {
      if (user.isEditing) {
        this.salvarEdicao(user);
      }
      user.isEditing = !user.isEditing;
    }
  
    salvarEdicao(user: any): void {
      this.userService.editarUsuario(user).subscribe(
        (data) => {
          console.log('Usuário editado com sucesso:', data);
        },
        (error) => {
          console.error('Erro ao editar usuário:', error);
        }
      );
    }
  
    deletarUsuario(user: any): void {
      this.userService.deletarUsuario(user.idUser).subscribe(
        () => {
          const index = this.users.indexOf(user);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
          console.log('Usuário deletado com sucesso');
        },
        (error) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
    }
  }