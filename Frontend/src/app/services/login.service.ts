import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl + '/login'; // Atualize com o endereço do seu servidor backend

  constructor(private http: HttpClient) {}

  fazerLogin(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, credentials);
  }
}
