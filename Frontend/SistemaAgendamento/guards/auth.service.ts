import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit {
    //baseUrl = environment.baseUrl;   colocar no environment a url da api http://localhost:8080/api

    static readonly habilitarMenu = new EventEmitter<boolean>();
    static readonly habilitarFooter = new EventEmitter<boolean>();

    constructor(
        private httpClient: HttpClient,
        private router: Router
      ) { }

      ngOnInit(){
        
      }

}