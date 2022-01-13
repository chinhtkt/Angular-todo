import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../in-memory-data.service';
import { AppRoutingModule } from '../../app-routing.module';
import { TodoComponent } from '../todo/todo.component';
import { FormsModule } from '@angular/forms';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoCompletedComponent } from '../todo-completed/todo-completed.component';
import {TodoRoutingModule} from './todo-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToDoReducer } from '../state/todo.reducer';
import { TodoEffects } from '../state/todo.effects';

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
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    TodoRoutingModule,
    CommonModule,
    StoreModule.forRoot({todos: ToDoReducer}),
    EffectsModule.forRoot([TodoEffects]),  ],
})
export class TodosModule {}
