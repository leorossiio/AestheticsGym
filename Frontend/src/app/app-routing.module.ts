import { NgModule } from '@angular/core';
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
import { IsAuthGuard } from './guard/auth-guard';
import { InicioComponent } from './tela-autenticada/components/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'aesthetic',
    component: TelaAutenticadaComponent,
    children: [
      { path: 'inicio', component: InicioComponent, canActivate: [IsAuthGuard] },
      { path: 'lista-aluno', component: ListaAlunoComponent, canActivate: [IsAuthGuard, IsAuthorizationGuardProfessor] },
      { path: 'cadastro-treino', component: CadastroTreinoComponent, canActivate: [IsAuthGuard, IsAuthorizationGuardProfessor] },
      { path: 'nutricao-cadastro', component: NutricaoCadastroComponent, canActivate: [IsAuthGuard, IsAuthorizationGuardProfessor] },
      { path: 'meu-treino', component: TreinoComponent, canActivate: [IsAuthGuard] },
      { path: 'meu-cardapio', component: NutricaoListaComponent, canActivate: [IsAuthGuard] },
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
