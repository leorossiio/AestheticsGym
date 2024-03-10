import { Component } from '@angular/core';

@Component({
  selector: 'app-home-pacotes',
  templateUrl: './home-pacotes.component.html',
  styleUrls: ['./home-pacotes.component.css']
})
export class HomePacotesComponent {

  mensaisSelecionado?: boolean = true;
  anuaisSelecionado?: boolean = false;

  pacotes = {
    afrodite: 100,
    hercules: 150,
    hades: 200,
    zeus: 300
  };

  alterarTipo() {
    this.mensaisSelecionado = !this.mensaisSelecionado;
    this.anuaisSelecionado = !this.anuaisSelecionado;

    if (this.anuaisSelecionado) {
      // Reduz 15% do valor total para cada pacote
      this.pacotes.afrodite = this.pacotes.afrodite * 0.80;
      this.pacotes.hercules = this.pacotes.hercules * 0.80;
      this.pacotes.hades = this.pacotes.hades * 0.80;
      this.pacotes.zeus = this.pacotes.zeus * 0.80;
    } else {
      // Se o tipo for mensal, restaure os valores originais
      this.pacotes.afrodite = 100;
      this.pacotes.hercules = 150;
      this.pacotes.hades = 200;
      this.pacotes.zeus = 300;
    }
  }
}