import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { UserService } from 'src/app/services/usuario.service';
import { Observer } from 'rxjs';
@Component({
  selector: 'app-cadastro-treino',
  templateUrl: './cadastro-treino.component.html',
  styleUrls: ['./cadastro-treino.component.css']
})
export class CadastroTreinoComponent implements OnInit {
  users: any[] = [];
  userRole: string | null = null;
  selectedUser: any; // Adicione esta propriedade


  usuario = {
    nome: '',
    email: '',
    funcao:'',
    dataCriacao:null
  };

  constructor(private authService: AuthService, private userService: UserService ) { }

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

  professor={
    nome: this.authService.getUserName()
  }


  treinos = [
    {
      nome: 'Treino A (Peito e trícepes)',
      exercicios: [
        {
          nome: 'Supino Reto com Barra',
          series: 4,
          repeticoes: 12
        },
        {
          nome: 'Supino inclinado com halters',
          series: 4,
          repeticoes: 10
        },
        {
          nome: 'crossover',
          series: 4,
          repeticoes: 10
        },
        {
          nome: 'Tríceps Francês',
          series: 4,
          repeticoes: 10
        },
        {
          nome: 'Tríceps no pulley',
          series: 4,
          repeticoes: 10
        }

      ]
    },
    {
      nome: 'Treino B (Costas e bíceps)',
      exercicios: [
        {
          nome: 'Pulley frente',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12
        },
        {
          nome: 'Remada curvada',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12
        },
        {
          nome: 'Levantamento terra',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12
        },
        {
          nome: 'Rosca martelo unilateral',
          descricao: 'Exercício para bíceps',
          series: 4,
          repeticoes: 12
        },
        {
          nome: 'Rosca scott',
          descricao: 'Exercício para bíceps',
          series: 4,
          repeticoes: 10
        }
      ]
    }
  ];


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
  


  


}
