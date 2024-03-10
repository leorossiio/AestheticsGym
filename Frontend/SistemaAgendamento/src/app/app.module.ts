import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente/lista-cliente.component';
import { FooterComponent } from './footer/footer/footer.component';
import { MenuComponent } from './menu/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeProgramasComponent } from './homepage/home-programas/home-programas.component';
import { HomeMidComponent } from './homepage/home-mid/home-mid.component';
import { HomePacotesComponent } from './homepage/home-pacotes/home-pacotes.component';
import { HomeHeaderComponent } from './homepage/home-header/home-header.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaClienteComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    CadastroComponent,
    HomepageComponent,
    HomeProgramasComponent,
    HomeMidComponent,
    HomePacotesComponent,
    HomeHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
