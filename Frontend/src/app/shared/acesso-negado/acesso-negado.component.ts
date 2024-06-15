import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrls: ['./acesso-negado.component.css']
})
export class AcessoNegadoComponent {

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //vazio
  }
  

  redirectToUserRole(): void {
    const userRole = this.AuthService.getUserRole();

    switch (userRole) {
      case 'PROFESSOR':
        this.router.navigate(['/aesthetic/lista-aluno']);
        break;
      case 'ALUNO':
        this.router.navigate(['/aesthetic/meu-treino']);
        break;
      default:
        this.router.navigate(['/not-found']); 
        break;
    }
  }
}
