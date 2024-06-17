import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { ExerciciosService } from 'src/app/services/exercicio.service';
import { TreinoService } from 'src/app/services/treino.service';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css']
})
export class TreinoComponent implements OnInit {
  userRole: string | null = null;
  aluno = {
    nome: this.authService.getUserName(),
    email: this.authService.getUserEmail()
  };
  treinos: any[] = []; // Inicializa como um array vazio para evitar erros de renderização

  constructor(
    private authService: AuthService,
    private treinoService: TreinoService,
    private exercicioService: ExerciciosService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.carregarTreinos();
  }

  carregarTreinos(): void {
    const idUser = this.authService.getUserId(); // Obter o ID do usuário autenticado
    this.treinoService.listarTreinoByIdUser(idUser).subscribe(
      (treinos: any[]) => {
        this.treinos = treinos;
        // Para cada treino, carrega os exercícios correspondentes
        // for (const treino of this.treinos) {
        //   this.carregarExerciciosPorTreino(treino.idTreino);
        // }
      },
      error => {
        console.error('Erro ao carregar treinos:', error);
      }
    );
  }

  carregarExerciciosPorTreino(idTreino: string): void {
    // Chama o serviço para listar os exercícios do treino
    // this.exercicioService.listarExercicioByIdTreino(idTreino).subscribe(
    //   (exercicios: any[]) => {
    //     // Encontra o treino correspondente e atribui os exercícios a ele
    //     const treino = this.treinos.find(t => t.idTreino === idTreino);
    //     if (treino) {
    //       treino.exercicios = exercicios;
    //     }
    //   },
    //   error => {
    //     console.error('Erro ao carregar exercícios:', error);
    //   }
    // );
  }

  ajustarAlturaTextArea(event: any): void {
    const textArea = event.target;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }


}
