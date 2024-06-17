import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarTreinoByIdUser(idUser: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/treino/listarTreinoPorUsuario/${idUser}`, {
      headers: this.getAuthHeaders()
    });
  }

  salvarTreino(treinoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/treino/cadastroTreino`, treinoData, {
      headers: this.getAuthHeaders()
    });
  }

  editarTreino(idTreino: string, treinoData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/treino/editarTreino/${idTreino}`, treinoData, {
      headers: this.getAuthHeaders()
    });
  }

  deletarTreino(idTreino: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/treino/deletarTreino/${idTreino}`, {
      headers: this.getAuthHeaders()
    });
  }
}
