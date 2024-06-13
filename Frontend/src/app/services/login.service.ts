import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl + '/login';

  constructor(private http: HttpClient, private router: Router) {}

  fazerLogin(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, credentials);
  }

  redirecionarUsuario(userRole: string) {
    switch (userRole.toUpperCase()) {
      case 'ALUNO':
        this.router.navigate(['/aesthetic/meu-treino']);
        break;
      case 'PROFESSOR':
        this.router.navigate(['/aesthetic/lista-aluno']);
        break;
      default:
        // Rota padrão caso o papel do usuário não seja reconhecido
        this.router.navigate(['/outra-rota']);
        break;
    }
  }
}
