import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { DietaService } from 'src/app/services/dieta.service';

interface Refeicao {
  nome: string;
  descricao: string;
  calorias: number;
}

interface PlanoNutricional {
  refeicoes: Refeicao[];
}

type PlanosSemana = {
  [key: string]: PlanoNutricional;
};

@Component({
  selector: 'app-nutricao-lista',
  templateUrl: './nutricao-lista.component.html',
  styleUrls: ['./nutricao-lista.component.css']
})
export class NutricaoListaComponent implements OnInit {
  userRole: string | null = null;
  diaSelecionado: string = 'segunda-feira';
  diasSemana: string[] = ['segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  aluno = {
    nome: this.authService.getUserName(),
    email: this.authService.getUserEmail()
  };

  planosSemana: PlanosSemana = {};

  constructor(private authService: AuthService, private dietaService: DietaService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.carregarDietas();
    
  }

  carregarDietas(): void {
    const idUser = this.authService.getUserId(); // Obter o ID do usuário autenticado
    this.dietaService.listarDietaByUserLogado(idUser).subscribe( // Passar o idUser como argumento
      (data: any[]) => {
        this.processarDietas(data);
      },
      (error) => {
        console.error('Erro ao carregar dietas:', error);
      }
    );
  }

  processarDietas(dietas: any[]): void {
    this.planosSemana = dietas.reduce((acc, dieta) => {
      const dia = dieta.diaDaSemana.toLowerCase(); // Usar toLowerCase para padronizar
      if (!acc[dia]) {
        acc[dia] = { refeicoes: [] };
      }
      acc[dia].refeicoes.push({
        nome: dieta.nome,
        descricao: dieta.descricao,
        calorias: dieta.calorias
      });
      return acc;
    }, {} as PlanosSemana);
    console.log('Planos de semana:', this.planosSemana); // Adicionar console.log aqui
  }
  
  get planoDoDia(): PlanoNutricional {
    return this.planosSemana[this.diaSelecionado] || { refeicoes: [] };
  }
}
