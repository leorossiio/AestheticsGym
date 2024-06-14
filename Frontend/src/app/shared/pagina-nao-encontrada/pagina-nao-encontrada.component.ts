import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent {

    constructor(
  
      private router: Router
    ) { }
  
    redirectToUserRole(): void {
      this.router.navigate(['/home']);
    }
  
  }

