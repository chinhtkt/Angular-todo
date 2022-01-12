import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Todo } from '../../todo'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;
  todoForm!: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private location: Location, private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.todoForm = this.fb.group(
      {
      task: ['', [Validators.required]],
    })
    this.getTodo();

  }

  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id)
      .subscribe((todo) => { this.todo = todo || this.goBack()
        this.todoForm.patchValue({
          task: todo.name
        })
      });
  }


  goBack(): void {
    this.location.back();
  }

  saveNewtodo(): void {
    this.submitted = true;
    const newTask: Todo = {
      id: this.todo.id,
      name: this.todoForm.value['task'],
      DoB: this.todo.DoB,
    }
    console.log(newTask)
    this.todoService.updateTodo(this.todo.id , newTask)
      .subscribe(() => this.goBack());
  }

}
