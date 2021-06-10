import { Component, OnInit } from '@angular/core';
import { task } from 'src/app/models/task';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public tasks: task[] = [];
  public displayedColumns = ["scope", "assignedTo", "createdBy", "title", "description", "status", "statusIcon"]
  constructor(
    private svc: AdminService
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    let ref = this.svc.getAlTasks().subscribe(res => {
      this.tasks = res
      ref.unsubscribe()
    })
  }

}
