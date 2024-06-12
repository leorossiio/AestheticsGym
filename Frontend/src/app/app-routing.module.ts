import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TelaAutenticadaComponent } from './tela-autenticada/tela-autenticada.component';
import { ListaAlunoComponent } from './tela-autenticada/components/lista-aluno/lista-aluno.component';
import { TreinoComponent } from './tela-autenticada/components/treino/treino.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para /home por padrão
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'aesthetic',
    component: TelaAutenticadaComponent,
    children: [
      { path: 'lista-aluno', component: ListaAlunoComponent },
      { path: 'treino', component: TreinoComponent }
    ]
  },
  // Outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
