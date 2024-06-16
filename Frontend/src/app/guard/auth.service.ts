import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, take } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/login';
  sessaoExpiradaSubject: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) { }

  fazerLogin(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, credentials).pipe(
      map(response => {
        // Armazenar o token no sessionStorage
        sessionStorage.setItem('token', response.token);
        return response;
      })
    );
  }

  getToken(credentials: { email: string, senha: string }): Observable<string> {
    return this.fazerLogin(credentials).pipe(
      map(response => response.token)
    );
  }

  redirecionarUsuario(userRole: string) {
    switch (userRole.toUpperCase()) {
      case 'ALUNO':
        this.router.navigate(['/aesthetic/inicio']);
        break;
      case 'PROFESSOR':
        this.router.navigate(['/aesthetic/inicio']);
        break;
      default:
        this.router.navigate(['/acesso-negado']);
        break;
    }
  }

  getAuthorizationToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserRole(): string {
    let token = this.getAuthorizationToken();
    if (!token) {
      return 'token não encontrado';
    }

    let decoded: any = jwtDecode(token);
    if (decoded.funcao) {
      return decoded.funcao;
    }
    return 'função não identificada no token';
  }

  usuarioEstaAutenticado(): boolean {
    let token = this.getAuthorizationToken();

    if (!token) {
      return false;
    }

    let expire = this.getExpirationToken(token);

    if (expire != null) {
      let horaAtual = new Date();
      let timeDiff = (expire.getTime() - (horaAtual.getTime()));

      return (timeDiff > 60000);
    }
    return false;
  }

  getExpirationToken(token: string): Date {
    let decoded: JwtPayload = jwtDecode(token);
    let tempo: number = decoded.exp!;
    let expiracao = new Date(tempo * 1000);
    return expiracao;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getUserName(): string {
    let token = this.getAuthorizationToken();
    if (!token) {
      return 'token não encontrado';
    }

    let decoded: any = jwtDecode(token);
    if (decoded.nome) {
      return decoded.nome;
    }
    return 'nome não identificado no token';
  }

  getUserId(): string {
    let token = this.getAuthorizationToken();
    if (!token) {
      return 'token não encontrado';
    }

    let decoded: any = jwtDecode(token);
    if (decoded.idUser) {
      return decoded.idUser;
    }
    return 'id não identificado no token';
  }

  getUserEmail(): string {
    let token = this.getAuthorizationToken();
    if (!token) {
      return 'token não encontrado';
    }

    let decoded: any = jwtDecode(token);
    if (decoded.email) {
      return decoded.email;
    }
    return 'nome não identificado no token';
  }

  tokenCountdownInit(): void {
    let _token = this.getAuthorizationToken();

    this.sessaoExpiradaSubject.pipe(take(1)).subscribe(() => {
      if (_token) {
        let expTime = this.getExpirationToken(_token).valueOf() - new Date().valueOf();

        setTimeout(() => {
          Swal.fire({
            position: 'center', icon: 'warning', heightAuto: false,
            confirmButtonColor: 'var(--primary-color)',
            text: `Sua sessão expirou.\nFaça login novamente!`
          });
          sessionStorage.removeItem("token");
          this.router.navigate(['login']);
        }, expTime);
      }
    });
  }

}
