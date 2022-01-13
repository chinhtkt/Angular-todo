import { Component, OnInit } from '@angular/core';
import {Todo} from '../../todo'
import {TodoService} from '../todo.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todoForm!: FormGroup;
  submitted = false;
  
  id!: number


  constructor(private todoService: TodoService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group(
      {
      task: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => this.todos = todos)
  }

  addTodo(): void {
    
    const newTodo: Todo = {
      id: this.id,
      name: this.todoForm.value['task'],
      DoB: new Date(this.todoForm.value['date'])
    }
    console.log(newTodo)
    if (!newTodo.name || !newTodo.DoB) { return alert('Please enter field!'); }
    this.todoService.addTodo( newTodo  as Todo)
      .subscribe(todos => {
        this.todos.push(todos);
      });
  }

  get f() {
    return this.todoForm.controls
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    alert(`Delete ${id} sucessfully`)
    this.todoService.deleteTodo(id).subscribe();
  }
  completeTodo(id: number): void {
      this.todos[id].completed = !this.todos[id].completed
      console.log(this.todos[id])
      this.todoService.updateTodoComplete(this.todos[id]).subscribe();
  }
}
