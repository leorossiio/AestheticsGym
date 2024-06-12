import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { UserService } from 'path/to/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  novoUsuario = {
    nome: '',
    email: '',
    senha: '',
    funcao: ''
  };
  confirmarSenha = '';

  // constructor(private userService: UserService) { }

  criarUsuario(): void { }

  // criarUsuario(): void {
  //   if (this.novoUsuario.senha !== this.confirmarSenha) {
  //     alert('As senhas não coincidem');
  //     return;
  //   }

  //   this.userService.criarUsuario(this.novoUsuario).subscribe(
  //     (res) => {
  //       // Handle success
  //       console.log('Usuário criado com sucesso', res);
  //       // Optionally, close the modal after successful user creation
  //       this.fecharModal();
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Erro ao criar usuário', error);
  //     }
  //   );
  // }

  // fecharModal(): void {
  //   // Close the modal using Bootstrap jQuery
  //   $('#addUserModal').modal('hide');
  // }
}
