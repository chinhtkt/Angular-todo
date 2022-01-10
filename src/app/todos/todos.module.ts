import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';
import { AppRoutingModule } from '../app-routing.module';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoCompletedComponent } from './todo-completed/todo-completed.component';



@NgModule({
  declarations: [
    TodoComponent,
    TodoDetailComponent,
    TodoCompletedComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ]
})
export class TodosModule { }
