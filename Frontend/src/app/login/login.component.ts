import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  invalidUser: boolean = false;

  constructor(private authService: AuthService) {
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
      this.authService.fazerLogin(credentials).subscribe(
        response => {
          localStorage.setItem('token', response.token);
        
          if (response.funcao) {
            console.log('Função do usuário:', response.funcao);
            this.authService.redirecionarUsuario(response.funcao);
          } else {
          
            console.error("Função do usuário não retornado pela API.");
          }
        },
        error => {
          this.invalidUser = true;
        }
      );
    }
  }
  
}
