import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import {TodoDetailComponent} from './todo-detail/todo-detail.component'

const routes: Routes = [
  { path: 'todos', component: TodoComponent },
  { path: 'todos-detail/:id', component: TodoDetailComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
