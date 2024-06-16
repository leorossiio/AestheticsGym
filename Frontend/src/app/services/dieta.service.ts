import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listarDietas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listarDietas`, { headers: this.getAuthHeaders() });
  }

  

  criarDieta(dietaData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cadastroDieta`, dietaData, { headers: this.getAuthHeaders() });
  }

  editarDieta(idDieta: string, dietaData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/editarDieta/${idDieta}`, dietaData, { headers: this.getAuthHeaders() });
  }

  deletarDieta(idDieta: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletarDieta/${idDieta}`, { headers: this.getAuthHeaders() });
  }
}
