import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Funcionario } from '../models/funcionario.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl;

  private usuarioUrl: string = this.baseUrl + '/funcionarios';
  private clienteUrl: string = this.baseUrl + '/usuarios';

  constructor(private httpClient: HttpClient) { }

  async getAll(): Promise<Usuario[]>{
    return await this.httpClient.get<Usuario[]>(this.usuarioUrl).toPromise();
  }

  async pesquisaFuncionarios(nomeFuncionario: string): Promise<Usuario[]>{
    return await this.httpClient.get<Usuario[]>(this.usuarioUrl + `/pesquisar/${nomeFuncionario}`).toPromise();
  }

  async pesquisaFuncionarioCodigo(cdFuncionario: string): Promise<HttpResponse<Object>>{
    return await this.httpClient.get(this.usuarioUrl + `/buscar-codigo/${cdFuncionario}`, {observe : 'response'}).toPromise();
  }

  async pesquisaFuncionario(cdFuncionario: string): Promise<Funcionario[]>{
    return await this.httpClient.get<Funcionario[]>(this.usuarioUrl + `/buscar-funcionario/${cdFuncionario}`).toPromise();
  }

  async adicionarUsuario(usuario: Usuario): Promise<Usuario>{
    return await this.httpClient.post<Usuario>(this.usuarioUrl + `/cadastrar-funcionario`,usuario).toPromise();
  }

  async editarUsuario(usuario: Usuario): Promise<Usuario>{
    return await this.httpClient.put<Usuario>(this.usuarioUrl + `/editar-funcionario/${usuario.cdFuncionario}`,usuario).toPromise();
  }

  async deletarFuncionario(cdFuncionario: string): Promise<void>{
    return await this.httpClient.delete<void>(this.usuarioUrl + `/deletar-funcionario/${cdFuncionario}`).toPromise();
  }

  async buscaUsuarioNome(nomeUsuario: string): Promise<any> {
      return await this.httpClient.get<any>(this.clienteUrl + `/${nomeUsuario}`).toPromise();
  }

  async existeSenha(nomeUsuario: string): Promise<HttpResponse<Object>> {
    return await this.httpClient.get(this.clienteUrl + `/atualizar-senha/${nomeUsuario}`, {observe : 'response'}).toPromise();
  }

  async alterarSenha(nomeUsuario: string, novaSenha: string): Promise<HttpResponse<Object>> {
    return await this.httpClient.put(this.clienteUrl + `/atualizar-senha/${nomeUsuario}`, novaSenha, {observe : 'response'}).toPromise();
  }
}
