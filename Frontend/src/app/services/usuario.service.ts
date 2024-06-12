import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl; // Atualize com o endereço do seu servidor backend

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/listarUsuarios`);
  }

  adicionarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/cadastroUsuarioNaoAutenticada`, user);
  }

  editarUsuario(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/editarUsuario/${user.email}`, user);
  }

  deletarUsuario(idUser: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${idUser}`);
  }
}
