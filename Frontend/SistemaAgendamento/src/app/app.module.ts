import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente/lista-cliente.component';
import { FooterComponent } from './footer/footer/footer.component';
import { MenuComponent } from './menu/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
