import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciciosService {
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarExercicioByIdTreino(idTreino: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/exercicio/listarExerciciosPorTreino/${idTreino}`, {
      headers: this.getAuthHeaders()
    });
  }

  salvarExercicio(exercicioData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/exercicio/cadastroExercicio`, exercicioData, {
      headers: this.getAuthHeaders()
    });
  }

  editarExercicio(idExercicio: string, exercicioData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/exercicio/editarExercicio/${idExercicio}`, exercicioData, {
      headers: this.getAuthHeaders()
    });
  }

  deletarExercicio(idExercicio: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/exercicio/deletarExercicio/${idExercicio}`, {
      headers: this.getAuthHeaders()
    });
  }
}
