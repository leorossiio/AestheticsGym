import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.component.html',
  styleUrls: ['./treino.component.css']
})
export class TreinoComponent implements OnInit {
  aluno = {
    nome: 'João Silva',
    idade: 25,
    nivel: 'Intermediário'
  };

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

  constructor() { }

  ngOnInit(): void {
  }


}
