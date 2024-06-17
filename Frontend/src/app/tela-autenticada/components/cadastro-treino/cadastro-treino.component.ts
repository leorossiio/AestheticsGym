import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { UserService } from 'src/app/services/usuario.service';
import { TreinoService } from 'src/app/services/treino.service';
import { ExerciciosService } from 'src/app/services/exercicio.service';

@Component({
  selector: 'app-cadastro-treino',
  templateUrl: './cadastro-treino.component.html',
  styleUrls: ['./cadastro-treino.component.css']
})
export class CadastroTreinoComponent implements OnInit {
  users: any[] = [];
  userRole: string | null = null;
  selectedUser: any;
  treinos: any[] = [];
  usuario = {
    nome: '',
    email: '',
    funcao: '',
    dataCriacao: null
  };

  // Adiciona uma propriedade para controlar a exibição do card de adição
  isAdding: boolean = false;
  novoTreinoNome: string = ''; // Adiciona uma propriedade para armazenar o nome do novo treino

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private treinoService: TreinoService,
    private exercicioService: ExerciciosService
  ) {
    authService.sessaoExpiradaSubject.next();
  }

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
      if (this.selectedUser.idUser) {
        this.carregarTreinosPorUsuario(this.selectedUser.idUser);
      } else {
        console.error('ID do usuário não especificado.');
      }
    }
  }

  carregarTreinosPorUsuario(userId: string): void {
    this.treinoService.listarTreinoByIdUser(userId).subscribe({
      next: (data) => {
        this.treinos = data;
        this.treinos.forEach((treino: any) => {
          this.carregarExerciciosPorTreino(treino.idTreino);
        });
      },
      error: (error) => {
        console.error('Erro ao carregar treinos:', error);
      }
    });
  }

  carregarExerciciosPorTreino(idTreino: string): void {
    this.exercicioService.listarExercicioByIdTreino(idTreino).subscribe({
      next: (exercicios) => {
        const treino = this.treinos.find((t: any) => t.idTreino === idTreino);
        if (treino) {
          treino.exercicios = exercicios;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar exercícios:', error);
      }
    });
  }

  // Método para abrir o card de adição
  abrirAdicao(): void {
    this.isAdding = true;
  }

  // Método para cancelar a adição
  cancelarAdicao(): void {
    this.isAdding = false;
    this.novoTreinoNome = ''; // Limpa o nome do novo treino
  }

  // Método para confirmar a adição do treino
  confirmarAdicao(): void {
    const idUserResponsavel = this.authService.getUserId();
    const novoTreino = {
      idUser: this.selectedUser.idUser, // Ou a propriedade correta para identificar o usuário
      idUserCriador: idUserResponsavel,
      nome: this.novoTreinoNome
    };
  
    this.treinoService.salvarTreino(novoTreino).subscribe(
      (response) => {
        // Adiciona o treino retornado pela API à lista de treinos
        this.treinos.push(response.treino);
       
        // Fecha o card de adição após a confirmação
        this.isAdding = false;
        // Limpa o nome do novo treino
        this.novoTreinoNome = '';
  
        // Se desejar, você pode acessar o treino recém-criado aqui
        const treinoCriado = response.treino;
        console.log('Treino criado:', treinoCriado);
      },
      (error) => {
        console.error('Erro ao adicionar treino:', error);
      }
    );
  }
  
  // Método para adicionar um treino
  adicionarTreino(): void {
    this.abrirAdicao(); // Abre o card de adição ao clicar em "Cadastrar Treino"
  }

  
  

  adicionarExercicio(treino: any, idUser: string): void {
    if (treino && treino.idTreino) {
      const novoExercicio = {
        nome: '',
        series: null,
        repeticoes: null,
        descricao: '',
        isEditing: true,
        idUser: idUser,
        idTreino: treino.idTreino
      };
  
      this.exercicioService.salvarExercicio(novoExercicio).subscribe(
        (response) => {
        
          treino.exercicios.push(response);
        },
        (error) => {
          console.error('Erro ao adicionar exercício:', error);
        }
      );
    } else {
      console.error('Treino não especificado ou ID do treino ausente.');
    }
  }
  
  


  salvarEdicaoExercicio(exercicio: any): void {
    this.exercicioService.editarExercicio(exercicio.idExercicio, exercicio).subscribe(
      () => {
        console.log('Exercício editado com sucesso');
      },
      (error) => {
        console.error('Erro ao editar exercício:', error);
      }
    );
  }

  deletarExercicio(treino: any, exercicio: any): void {
    const index = treino.exercicios.indexOf(exercicio);
    if (index !== -1) {
      treino.exercicios.splice(index, 1);
      this.exercicioService.deletarExercicio(exercicio.idExercicio).subscribe(
        () => {
          console.log('Exercício deletado com sucesso');
        },
        (error) => {
          console.error('Erro ao deletar exercício:', error);
        }
      );
    }
  }

  toggleEditTreino(treino: any): void {
    if (treino.isEditing) {
      this.salvarEdicaoTreino(treino);
    }
    treino.isEditing = !treino.isEditing;
  }
  toggleEditExercicio(exercicio: any): void {
    if (exercicio.isEditing) {
      this.salvarEdicaoExercicio(exercicio);
    }
    exercicio.isEditing = !exercicio.isEditing;
}


  salvarEdicaoTreino(treino: any): void {
    this.treinoService.editarTreino(treino.idTreino, treino).subscribe(
      () => {
        console.log('Treino editado com sucesso');
      },
      (error) => {
        console.error('Erro ao editar treino:', error);
      }
    );
  }

  deletarTreino(treino: any): void {
    const index = this.treinos.indexOf(treino);
    if (index !== -1) {
      this.treinos.splice(index, 1);
      this.treinoService.deletarTreino(treino.idTreino).subscribe(
        () => {
          console.log('Treino deletado com sucesso');
        },
        (error) => {
          console.error('Erro ao deletar treino:', error);
        }
      );
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
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }
}
