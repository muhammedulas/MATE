import { Component, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatTable } from '@angular/material/table';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-_teams',
  templateUrl: './_teams.component.html',
  styleUrls: ['./_teams.component.scss']
})
export class _teamsComponent implements OnInit {
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
