import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-_tasks',
  templateUrl: './_tasks.component.html',
  styleUrls: ['./_tasks.component.scss']
})
export class _tasksComponent implements OnInit {
  public dataSource = [
    {
      TEAM_NAME: 'Test',
      TEAM_DEF: 'Test',
      MEMBER_COUNT: 'Test'
    }
  ]
  public displayedColumns = ['teamName', 'teamDef', 'memberCount']
  constructor() { }

  ngOnInit() {
  }

}
