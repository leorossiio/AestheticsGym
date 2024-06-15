import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent {

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

