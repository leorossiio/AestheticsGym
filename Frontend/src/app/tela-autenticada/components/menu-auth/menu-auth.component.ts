import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../guard/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-auth',
  templateUrl: './menu-auth.component.html',
  styleUrls: ['./menu-auth.component.css']
})
export class MenuAuthComponent implements OnInit {

  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  confirmarLogout(): void {
    // Realiza o logout apenas se confirmado
    {
      this.authService.logout();
       // Recarrega a página após o logout
    }
  }
}
