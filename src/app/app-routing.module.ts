import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoComponent } from './todos/todo/todo.component';

const routes: Routes = [
  {
    path: 'todos',
    loadChildren:() => 
         import('./todos/todo/todo.module').then((m) => m.TodosModule)
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
