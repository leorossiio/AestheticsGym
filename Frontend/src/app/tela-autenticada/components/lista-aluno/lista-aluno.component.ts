import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../../services/usuario.service';
import { AuthService } from 'src/app/guard/auth.service';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter(user => {
            return user.nome.toLowerCase().includes(searchText) ||
                   user.email.toLowerCase().includes(searchText) ||
                   user.funcao.toLowerCase().includes(searchText);
        });
    }
}

@Component({
    selector: 'app-lista-aluno',
    templateUrl: './lista-aluno.component.html',
    styleUrls: ['./lista-aluno.component.css']
})
export class ListaAlunoComponent implements OnInit {
    users: any[] = [];
    filtro: string = '';

    constructor(private userService: UserService, private authService: AuthService) { authService.sessaoExpiradaSubject.next(); }

    ngOnInit(): void {
        this.carregarUsuarios();
    }

    carregarUsuarios(): void {
        this.userService.listarUsuarios().subscribe(
            (data) => {
                this.users = data;
            },
            (error) => {
                console.error('Erro ao carregar usuários:', error);
            }
        );
    }

    toggleEdit(user: any): void {
        if (user.isEditing) {
            alert("Usuário salvo com sucesso!");
            this.salvarEdicao(user);
        }
        user.isEditing = !user.isEditing;
    }

    salvarEdicao(user: any): void {
        this.userService.editarUsuario(user.idUser, user).subscribe(
            () => {
                console.log('Usuário editado com sucesso:');
                this.carregarUsuarios(); // Atualiza a tabela após salvar a edição
            },
            (error) => {
                console.error('Erro ao editar usuário:', error);
            }
        );
    }

    deletarUsuario(user: any): void {
        this.userService.deletarUsuario(user.idUser).subscribe(
            () => {
                const index = this.users.indexOf(user);
                if (index !== -1) {
                    this.users.splice(index, 1);
                }
                console.log('Usuário deletado com sucesso');
            },
            (error) => {
                console.error('Erro ao deletar usuário:', error);
            }
        );
    }

    formatarData(data: string): string {
        const dataCriacao = new Date(data);
        return dataCriacao.toLocaleDateString('pt-BR');
    }
}
