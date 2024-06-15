import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TelaAutenticadaComponent } from './tela-autenticada/tela-autenticada.component';
import { ListaAlunoComponent } from './tela-autenticada/components/lista-aluno/lista-aluno.component';
import { TreinoComponent } from './tela-autenticada/components/treino/treino.component';
import { CadastroTreinoComponent } from './tela-autenticada/components/cadastro-treino/cadastro-treino.component';
import { NutricaoCadastroComponent } from './tela-autenticada/components/nutricao-cadastro/nutricao-cadastro.component';
import { NutricaoListaComponent } from './tela-autenticada/components/nutricao-lista/nutricao-lista.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './shared/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { IsAuthorizationGuardProfessor } from './guard/authorization.guard';
// import { IsAuthGuard } from './guard/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para /home por padrão
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'aesthetic',
    component: TelaAutenticadaComponent,
    children: [
      { path: 'lista-aluno', component: ListaAlunoComponent, canActivate: [IsAuthorizationGuardProfessor]},
      { path: 'meu-treino', component: TreinoComponent },
      { path: 'cadastro-treino', component: CadastroTreinoComponent, canActivate: [IsAuthorizationGuardProfessor]},
      { path: 'nutricao-cadastro', component: NutricaoCadastroComponent, canActivate: [IsAuthorizationGuardProfessor]},
      { path: 'nutricao-lista', component: NutricaoListaComponent,},

    ]
  },
  
  
  { path: 'not-found', component: PaginaNaoEncontradaComponent },
  { path: 'forbidden', component: AcessoNegadoComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
