import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl; // Atualize com o endereço do seu servidor backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarUsuarios(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/users/listarUsuarios`, { headers });
  }

  adicionarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/cadastroUsuarioNaoAutenticada`, user);
  }

  editarUsuario(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/users/editarUsuario/${user.email}`, user, { headers });
  }

  deletarUsuario(idUser: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/users/${idUser}`, { headers });
}

}
