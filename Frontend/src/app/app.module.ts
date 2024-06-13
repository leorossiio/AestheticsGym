import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { MenuComponent } from './homepage/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomeProgramasComponent } from './homepage/home-programas/home-programas.component';
import { HomeMidComponent } from './homepage/home-mid/home-mid.component';
import { HomePacotesComponent } from './homepage/home-pacotes/home-pacotes.component';
import { HomeHeaderComponent } from './homepage/home-header/home-header.component';
import { FormsModule } from '@angular/forms';
import { TelaAutenticadaComponent } from './tela-autenticada/tela-autenticada.component';

import { MenuAuthComponent } from './tela-autenticada/components/menu-auth/menu-auth.component';
import { ListaAlunoComponent } from './tela-autenticada/components/lista-aluno/lista-aluno.component';
import { AddUserModalComponent } from './tela-autenticada/components/lista-aluno/component/add-user-modal/add-user-modal.component';
import { TreinoComponent } from './tela-autenticada/components/treino/treino.component';
import { HttpClientModule } from '@angular/common/http';
import { SobreComponent } from './tela-autenticada/components/menu-auth/components/sobre/sobre.component';
import { CadastroTreinoComponent } from './tela-autenticada/components/cadastro-treino/cadastro-treino.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './shared/pagina-nao-encontrada/pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    CadastroComponent,
    HomepageComponent,
    HomeProgramasComponent,
    HomeMidComponent,
    HomePacotesComponent,
    HomeHeaderComponent,
    TelaAutenticadaComponent,
    MenuAuthComponent,
    ListaAlunoComponent,
    AddUserModalComponent,
    TreinoComponent,
    SobreComponent,
    CadastroTreinoComponent,
    AcessoNegadoComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
