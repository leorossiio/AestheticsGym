import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  invalidUser: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.password
      };

      this.loginService.fazerLogin(credentials).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          // Verifica se a resposta possui a propriedade 'funcao'
          if (response.funcao) {
            // Após o login bem-sucedido, redirecione com base na função do usuário
            this.loginService.redirecionarUsuario(response.funcao);
          } else {
            // Trata caso a função do usuário não seja retornado
            console.error("Função do usuário não retornado pela API.");
            // Redireciona para uma rota padrão ou exibe uma mensagem de erro
          }
        },
        error => {
          this.invalidUser = true;
        }
      );
    }
  }
}
