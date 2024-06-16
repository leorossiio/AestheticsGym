import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-treino',
  templateUrl: './cadastro-treino.component.html',
  styleUrls: ['./cadastro-treino.component.css']
})
export class CadastroTreinoComponent implements OnInit {
  users: any[] = [];
  user: any[] = [];
  userRole: string | null = null;
  selectedUser: any;

  usuario = {
    nome: '',
    email: '',
    funcao: '',
    dataCriacao: null
  };



  constructor(private authService: AuthService, private userService: UserService) { authService.sessaoExpiradaSubject.next(); }

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

  professor = {
    nome: this.authService.getUserName()
  }

  treinos = [
    {
      nome: 'Treino A (Peito e tríceps)',
      isEditing: false,
      exercicios: [
        {
          nome: 'Supino Reto com Barra',
          series: 4,
          repeticoes: 12,
          isEditing: false,
          descricao:''
        },
        {
          nome: 'Supino inclinado com halters',
          series: 4,
          repeticoes: 10,
          isEditing: false
        },
        {
          nome: 'Crossover',
          series: 4,
          repeticoes: 10,
          isEditing: false
        },
        {
          nome: 'Tríceps Francês',
          series: 4,
          repeticoes: 10,
          isEditing: false
        },
        {
          nome: 'Tríceps no pulley',
          series: 4,
          repeticoes: 10,
          isEditing: false
        }
      ]
    },
    {
      nome: 'Treino B (Costas e bíceps)',
      isEditing: false,
      exercicios: [
        {
          nome: 'Pulley frente',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12,
          isEditing: false
        },
        {
          nome: 'Remada curvada',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12,
          isEditing: false
        },
        {
          nome: 'Levantamento terra',
          descricao: 'Exercício para costas',
          series: 4,
          repeticoes: 12,
          isEditing: false
        },
        {
          nome: 'Rosca martelo unilateral',
          descricao: 'Exercício para bíceps',
          series: 4,
          repeticoes: 12,
          isEditing: false
        },
        {
          nome: 'Rosca scott',
          descricao: 'Exercício para bíceps',
          series: 4,
          repeticoes: 10,
          isEditing: false
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

  toggleEditExercicio(exercicio: any): void {
    if (exercicio.isEditing) {
      this.salvarEdicaoExercicio(exercicio);
    }
    exercicio.isEditing = !exercicio.isEditing;
  }

  salvarEdicaoExercicio(exercicio: any): void {
    // Lógica para salvar a edição do exercício (exemplo de requisição HTTP)
    // this.userService.editarExercicio(exercicio.id, exercicio).subscribe(
    //   () => {
    //     console.log('Exercício editado com sucesso');
    //   },
    //   (error) => {
    //     console.error('Erro ao editar exercício:', error);
    //   }
    // );
  }

  deletarExercicio(treino: any, exercicio: any): void {
    const index = treino.exercicios.indexOf(exercicio);
    if (index !== -1) {
      treino.exercicios.splice(index, 1);
      console.log('Exercício deletado com sucesso');
    }
  }

  toggleEditTreino(treino: any): void {
    if (treino.isEditing) {
      this.salvarEdicaoTreino(treino);
    }
    treino.isEditing = !treino.isEditing;
  }

  salvarEdicaoTreino(treino: any): void {
    //  Lógica para salvar a edição do treino (exemplo de requisição HTTP)
    // this.userService.editarTreino(treino.id, treino).subscribe(
    //   () => {
    //     console.log('Treino editado com sucesso');
    //   },
    //   (error) => {
    //     console.error('Erro ao editar treino:', error);
    //   }
    // );
  }

  deletarTreino(treino: any): void {
    const index = this.treinos.indexOf(treino);
    if (index !== -1) {
      this.treinos.splice(index, 1);
      console.log('Treino deletado com sucesso');
    }
  }

  adicionarTreino(): void {
    const novoTreino = {
      nome: '',
      isEditing: true,
      exercicios: []
    };
    this.treinos.push(novoTreino);
  }

  adicionarExercicio(treino: any): void {
    const novoExercicio = {
      nome: '',
      series: null, // Exemplo de número padrão de séries
      repeticoes: null, // Exemplo de número padrão de repetições
      descricao: '', // Incluir a propriedade descricao
      isEditing: true // Define como verdadeiro para permitir edição imediata
    };
  
    // Verifica se há um treino selecionado
    if (treino) {
      // Adiciona o novo exercício ao treino específico
      treino.exercicios.push(novoExercicio);
    } else {
      console.error('Treino não especificado.');
    }
  }
  
  
}
