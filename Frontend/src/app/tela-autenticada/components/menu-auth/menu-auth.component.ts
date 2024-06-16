import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../guard/auth.service';  // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-menu-auth',
  templateUrl: './menu-auth.component.html',
  styleUrls: ['./menu-auth.component.css']
})
export class MenuAuthComponent implements OnInit {

  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
  }
}
