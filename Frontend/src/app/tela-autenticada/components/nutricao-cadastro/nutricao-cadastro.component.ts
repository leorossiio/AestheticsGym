import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { DietaService } from 'src/app/services/dieta.service';
import { UserService } from 'src/app/services/usuario.service'; // Importar o serviço de usuários

interface Aluno {
  id: number;
  nome: string;
  idade: number;
  nivel: string;
}

interface Refeicao {
  nome: string;
  descricao: string;
  calorias: number;
  isEditing?: boolean;
}

interface PlanoNutricional {
  refeicoes: Refeicao[];
}

@Component({
  selector: 'app-nutricao-cadastro',
  templateUrl: './nutricao-cadastro.component.html',
  styleUrls: ['./nutricao-cadastro.component.css']
})
export class NutricaoCadastroComponent implements OnInit {
  alunoSelecionado: Aluno | null = null;
  users: any[] = [];
  userRole: string | null = null;
  selectedUser: any;

  usuario = {
    nome: '',
    email: '',
    funcao: '',
    dataCriacao: null
  };

  diaSelecionado: string = 'Segunda-feira';
  diasSemana: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo', 'Vázio'];

  planosSemana: { [key: string]: PlanoNutricional } = {};

  constructor(private authService: AuthService, private userService: UserService, private dietaService: DietaService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService.listarUsuarios().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuários carregados:', this.users);
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  carregarDietas(): void {
    if (this.selectedUser) {
      const idUser = this.selectedUser.id; // Obter o ID do usuário selecionado
      this.dietaService.listarDietaByUserLogado(idUser).subscribe(
        (data: any[]) => {
          this.processarDietas(data);
        },
        (error) => {
          console.error('Erro ao carregar dietas:', error);
        }
      );
    }
  }

  processarDietas(dietas: any[]): void {
    this.planosSemana = dietas.reduce((acc, dieta) => {
      const dia = dieta.diaDaSemana.toLowerCase(); // Padronizar para minúsculas
      if (!acc[dia]) {
        acc[dia] = { refeicoes: [] };
      }
      acc[dia].refeicoes.push({
        nome: dieta.nome,
        descricao: dieta.descricao,
        calorias: dieta.calorias
      });
      return acc;
    }, {} as { [key: string]: PlanoNutricional });
  }

  adicionarRefeicao() {
    const novaRefeicao: Refeicao = { nome: '', descricao: '', calorias: 0, isEditing: true };
    this.planosSemana[this.diaSelecionado].refeicoes.push(novaRefeicao);
  }

  deletarRefeicao(refeicao: Refeicao) {
    const index = this.planosSemana[this.diaSelecionado].refeicoes.indexOf(refeicao);
    if (index !== -1) {
      this.planosSemana[this.diaSelecionado].refeicoes.splice(index, 1);
    }
  }

  editarRefeicao(refeicao: Refeicao) {
    refeicao.isEditing = !refeicao.isEditing;
  }

  toggleEdit(refeicao: Refeicao) {
    if (refeicao.isEditing) {
      this.editarRefeicao(refeicao); // Salvar alterações
    } else {
      refeicao.isEditing = true; // Entrar no modo de edição
    }
  }

  formatarData(data: string): string {
    if (data) {
      const dataCriacao = new Date(data);
      return dataCriacao.toLocaleDateString('pt-BR');
    } else {
      return '';
    }
  }

  atualizarUserInformacoes(): void {
    if (this.selectedUser) {
      this.usuario.nome = this.selectedUser.nome;
      this.usuario.email = this.selectedUser.email;
      this.usuario.funcao = this.selectedUser.funcao;
      this.usuario.dataCriacao = this.selectedUser.dataCriacao;
    }
  }

  get planoDoDia(): PlanoNutricional {
    return this.planosSemana[this.diaSelecionado];
  }
}
