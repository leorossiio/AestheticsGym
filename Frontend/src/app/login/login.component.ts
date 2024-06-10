import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    login: '',
    senha: ''
  }

  loginAuth: string = "admin";
  senhaAuth: string = "admin";
  constructor(
    private router : Router
    )
    {}
  fazerLogin() {
    if (this.usuario.login === this.loginAuth && this.usuario.senha === this.senhaAuth) {
      this.router.navigate(['/tela-inicial']);
      alert("Login feito");
    }
    else{
      alert("Acesso recusado");
    }
  }

}
