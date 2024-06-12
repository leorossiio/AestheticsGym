// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Exemplo de chamada GET
  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todoList`);
  }

  // Exemplo de chamada POST
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Outros métodos de API conforme necessário...
}
