import { Component, OnInit } from '@angular/core';
import { todo } from 'src/app/models/todo';
import { TodoStatusPipe } from 'src/app/pipes/todoStatus.pipe';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-_todos',
  templateUrl: './_todos.component.html',
  styleUrls: ['./_todos.component.scss']
})
export class _todosComponent implements OnInit {
  public newTodoMode: boolean = false;
  public newTodo: todo;
  public todos: todo[] = [];
  constructor(
    private svc: GeneralService
  ) { }

  ngOnInit() {
    this.getTodos()
    this.initializeTodoItem()
  }

  newTodoItem() {
    this.newTodoMode = true;
    this.initializeTodoItem()
  }

  send(content, title) {
    this.newTodo = {
      TASKID: 0,
      USERREF: parseInt(this.svc.session.userId),
      TASK_TITLE: title,
      TASK_DESCRIPTION: content,
      STATUS: 0
    }
    this.svc.createTodo(this.newTodo).subscribe(res => {
      if (res.OK == true) {
        this.getTodos()
      }
    }, err => {
      console.log(err)
    })
  }


  initializeTodoItem() {
    this.newTodo = {
      TASKID: 0,
      USERREF: 0,
      TASK_TITLE: "",
      TASK_DESCRIPTION: "",
      STATUS: 0
    }
  }

  getTodos() {
    this.svc.getTodos().subscribe(res => {
      this.todos = res
    }, err => {
      console.log(err)
    })
  }

  update(todo: todo, status?: number) {
    let temp = todo;
    temp.STATUS = status
    this.svc.updateTodo(temp).subscribe(res => {
      this.getTodos()
    }, err => {
      console.log(err)
    })
  }

}
