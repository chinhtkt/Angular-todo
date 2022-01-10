import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

const todoRoutes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'todos-detail/:id', component: TodoDetailComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(todoRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
