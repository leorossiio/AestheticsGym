import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AuthService } from '../guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarDietas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dieta/listarDietas`, { headers: this.getAuthHeaders() });
  }

  listarDietaByUserLogado(idUser: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dieta/listarDietasPorUsuario/${idUser}`, { headers: this.getAuthHeaders() });
  }

  listarDietaByUserSelecionado(idUser: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dieta/listarDietasPorUsuario/${idUser}`, { headers: this.getAuthHeaders() });
  }

  criarDieta(dietaData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/dieta/cadastroDieta`, dietaData, { headers: this.getAuthHeaders() });
  }

  editarDieta(idDieta: string, dietaData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/dieta/editarDieta/${idDieta}`, dietaData, { headers: this.getAuthHeaders() });
  }

  deletarDieta(idDieta: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/dieta/deletarDieta/${idDieta}`, { headers: this.getAuthHeaders() });
  }
}
