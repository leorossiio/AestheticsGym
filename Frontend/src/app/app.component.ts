import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFooter = !(event.url.includes('/login') || event.url.includes('/cadastro'));
      }
    });

    // Redireciona para /home se não estiver em /login ou /cadastro
    const currentUrl = this.router.url;
    if (currentUrl === '/' || currentUrl === '') {
      this.router.navigate(['/home']);
    }
  }
}
