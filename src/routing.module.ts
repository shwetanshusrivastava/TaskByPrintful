import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'home',  pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'questions/:id', component: QuestionComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [    RouterModule.forRoot(routes, { enableTracing: true }),
],
  exports: [RouterModule]
})
export class RoutingModule { }