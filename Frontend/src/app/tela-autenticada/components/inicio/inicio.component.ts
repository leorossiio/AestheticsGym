import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private authService: AuthService) { }
  userRole: string | null = null;
  aluno = {
    nome: this.authService.getUserName(),
  };

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

}
