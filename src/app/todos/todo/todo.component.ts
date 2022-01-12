import { Component, OnInit } from '@angular/core';
import {Todo} from '../../todo'
import {TodoService} from '../todo.service'
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  
  
  id!: number
  todoForm = new FormGroup({
    task: new FormControl(''),
    date: new FormControl(''),
  })

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
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
    // let convertDate = new Date(date)
    // name = name.trim()
    // const newTodo: Todo = {
    //   id: this.id,
    //   name: name,
    //   DoB: convertDate
    // }
    // if (!name && !date) { return alert('Please enter field!'); }
    // this.todoService.addTodo( newTodo  as Todo)
    //   .subscribe(todos => {
    //     this.todos.push(todos);
    //   });
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    alert(`Delete ${id} sucessfully`)
    this.todoService.deleteTodo(id).subscribe();
  }
  completeTodo(id: number): void {
      this.todos[id].completed = !this.todos[id].completed
      this.todoService.updateTodoComplete(this.todos[id]).subscribe();
  }
}
