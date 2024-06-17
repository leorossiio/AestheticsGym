import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { UserService } from 'src/app/services/usuario.service';
import { DietaService } from 'src/app/services/dieta.service'; // Importe o serviço de Dieta

interface Aluno {
  id: number;
  nome: string;
}

interface Refeicao {
  idDieta?: string;
  nome: string;
  descricao: string;
  horarioRefeicao: string;
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

  diaSelecionado: string = 'segunda-feira';
  diasSemana: string[] = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];

  planosSemana: { [key: string]: PlanoNutricional } = {
    'segunda-feira': { refeicoes: [] },
    'terça-feira': { refeicoes: [] },
    'quarta-feira': { refeicoes: [] },
    'quinta-feira': { refeicoes: [] },
    'sexta-feira': { refeicoes: [] },
    'sábado': { refeicoes: [] },
    'domingo': { refeicoes: [] }
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dietaService: DietaService // Injete o serviço de Dieta
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.carregarDietas();
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

  adicionarRefeicao() {
    const novaRefeicao: Refeicao = { nome: '', descricao: '', horarioRefeicao: '', calorias: 0, isEditing: true };
    this.planosSemana[this.diaSelecionado].refeicoes.push(novaRefeicao);
  }

  editarRefeicao(refeicao: Refeicao) {
    refeicao.isEditing = !refeicao.isEditing;
  }

  toggleEdit(refeicao: Refeicao) {
    if (refeicao.isEditing) {
      this.salvarRefeicao(refeicao); // Save changes
    } else {
      refeicao.isEditing = true; // Enter edit mode
    }
  }

  deletarRefeicao(refeicao: Refeicao) {
    if (this.selectedUser) {
      const index = this.planosSemana[this.diaSelecionado].refeicoes.indexOf(refeicao);
      if (index !== -1) {
        this.planosSemana[this.diaSelecionado].refeicoes.splice(index, 1);

        if (refeicao.idDieta) {
          this.dietaService.deletarDieta(refeicao.idDieta).subscribe({
            next: (response) => {
              console.log('Refeição deletada com sucesso');
            },
            error: (error) => {
              console.error('Erro ao deletar refeição:', error);
            }
          });
        }
      }
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
      this.carregarDietas();
    }
  }

  carregarDietas(): void {
    if (this.selectedUser) {
      this.dietaService.listarDietaByUserSelecionado(this.selectedUser.idUser).subscribe({
        next: (data: any[]) => { // Definindo o tipo como any[]
          data.forEach((dieta: any) => { // Definindo o tipo como any
            this.planosSemana[dieta.diaDaSemana].refeicoes.push({
              idDieta: dieta.idDieta,
              nome: dieta.nome,
              descricao: dieta.descricao,
              horarioRefeicao: dieta.horarioRefeicao,
              calorias: dieta.calorias,
              isEditing: false
            });
          });
        },
        error: (error) => {
          console.error('Erro ao carregar dietas:', error);
        }
      });
    }
  }


  salvarRefeicao(refeicao: Refeicao) {
    if (this.selectedUser) {
      const dietaData = {
        nome: refeicao.nome,
        descricao: refeicao.descricao,
        calorias: refeicao.calorias,
        diaDaSemana: this.diaSelecionado,
        horarioRefeicao: refeicao.horarioRefeicao,
        idUser: this.selectedUser.idUser
      };

      // Verifica se a refeição já tem um ID (indicando que já está salva no backend)
      if (refeicao.idDieta) {
        this.dietaService.editarDieta(refeicao.idDieta, dietaData).subscribe({
          next: (response) => {
            refeicao.isEditing = false;
            console.log('Refeição atualizada com sucesso');
          },
          error: (error) => {
            console.error('Erro ao atualizar refeição:', error);
          }
        });
      } else {
        this.dietaService.criarDieta(dietaData).subscribe({
          next: (response) => {
            refeicao.idDieta = response.idDieta; // Atribui o ID retornado pela API
            refeicao.isEditing = false;
            console.log('Refeição salva com sucesso');
          },
          error: (error) => {
            console.error('Erro ao salvar refeição:', error);
          }
        });
      }
    }
  }

  get planoDoDia(): PlanoNutricional {
    return this.planosSemana[this.diaSelecionado];
  }
}
