import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { UserService } from 'src/app/services/usuario.service';

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

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.carregarUsuarios();
  }


  atualizarUserInformacoes(): void {
    if (this.selectedUser) {
      this.usuario.nome = this.selectedUser.nome;
      this.usuario.email = this.selectedUser.email;
      this.usuario.funcao = this.selectedUser.funcao;
      this.usuario.dataCriacao = this.selectedUser.dataCriacao;
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

  diaSelecionado: string = 'Segunda-feira';
  diasSemana: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo', 'Vázio'];

  planosSemana: { [key: string]: PlanoNutricional } = {
    'Segunda-feira': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Omelete de claras com espinafre.', calorias: 150 },
        { nome: 'Lanche da manhã', descricao: 'Iogurte grego com mel e nozes.', calorias: 100 },
        { nome: 'Almoço', descricao: 'Peito de frango grelhado com batata-doce.', calorias: 350 },
        { nome: 'Lanche da tarde', descricao: 'Smoothie de frutas vermelhas.', calorias: 150 },
        { nome: 'Jantar', descricao: 'Sopa de legumes com quinoa.', calorias: 200 }
      ]
    },
    'Terça-feira': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Aveia com banana e morango.', calorias: 200 },
        { nome: 'Lanche da manhã', descricao: 'Maçã com pasta de amendoim.', calorias: 120 },
        { nome: 'Almoço', descricao: 'Salada de quinoa com legumes frescos.', calorias: 250 },
        { nome: 'Lanche da tarde', descricao: 'Barrinha de cereais.', calorias: 100 },
        { nome: 'Jantar', descricao: 'Peixe grelhado com vegetais.', calorias: 300 }
      ]
    },
    // Continue adicionando planos para os outros dias da semana
    'Quarta-feira': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Panqueca de aveia com mel.', calorias: 180 },
        { nome: 'Lanche da manhã', descricao: 'Laranja e castanhas.', calorias: 110 },
        { nome: 'Almoço', descricao: 'Macarrão integral com molho de tomate e frango.', calorias: 320 },
        { nome: 'Lanche da tarde', descricao: 'Iogurte natural com frutas.', calorias: 130 },
        { nome: 'Jantar', descricao: 'Salada de atum com grão-de-bico.', calorias: 210 }
      ]
    },
    'Quinta-feira': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Smoothie verde com espinafre e banana.', calorias: 170 },
        { nome: 'Lanche da manhã', descricao: 'Biscoitos integrais com queijo cottage.', calorias: 120 },
        { nome: 'Almoço', descricao: 'Arroz integral com legumes e carne magra.', calorias: 330 },
        { nome: 'Lanche da tarde', descricao: 'Pêra e nozes.', calorias: 140 },
        { nome: 'Jantar', descricao: 'Sopa de lentilha com cenoura.', calorias: 220 }
      ]
    },
    'Sexta-feira': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Iogurte com granola.', calorias: 160 },
        { nome: 'Lanche da manhã', descricao: 'Banana com aveia.', calorias: 130 },
        { nome: 'Almoço', descricao: 'Quiche de espinafre com salada.', calorias: 280 },
        { nome: 'Lanche da tarde', descricao: 'Suco de laranja natural.', calorias: 100 },
        { nome: 'Jantar', descricao: 'Frango ao curry com arroz integral.', calorias: 300 }
      ]
    },
    'Sábado': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Torrada integral com abacate.', calorias: 200 },
        { nome: 'Lanche da manhã', descricao: 'Morango com iogurte natural.', calorias: 110 },
        { nome: 'Almoço', descricao: 'Salmão grelhado com batatas.', calorias: 350 },
        { nome: 'Lanche da tarde', descricao: 'Suco de beterraba e cenoura.', calorias: 90 },
        { nome: 'Jantar', descricao: 'Pizza de massa integral com vegetais.', calorias: 250 }
      ]
    },
    'Domingo': {
      refeicoes: [
        { nome: 'Café da manhã', descricao: 'Vitamina de frutas com aveia.', calorias: 180 },
        { nome: 'Lanche da manhã', descricao: 'Tangerina e amêndoas.', calorias: 100 },
        { nome: 'Almoço', descricao: 'Carne assada com legumes.', calorias: 340 },
        { nome: 'Lanche da tarde', descricao: 'Suco verde detox.', calorias: 80 },
        { nome: 'Jantar', descricao: 'Wrap integral com frango e salada.', calorias: 240 }
      ]
    },

    'Vázio': {
      refeicoes: [
        //Ao criar em adicionar, deve colocar somente o nome da refeição e o corpo dela com um botão de mais

      ]
    }
  };


  adicionarRefeicao(){
    //Passar o parametro do dia;
    //Passar o nome da refeição
    //descricao
    //calorias
  }



  aluno: Aluno = {
    id: 1,
    nome: '',
    idade: 25,
    nivel: 'Intermediário'
  };

  get planoDoDia(): PlanoNutricional {
    return this.planosSemana[this.diaSelecionado];
  }
}
