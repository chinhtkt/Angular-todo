import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodosModule } from './todos/todo/todo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ToDoReducer} from './todos/state/todo.reducer';
import { TodoEffects } from './todos/state/todo.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TodosModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot({todos: ToDoReducer}),
    EffectsModule.forRoot([TodoEffects]),  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
