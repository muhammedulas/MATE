/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { _teamsComponent } from './_teams.component';

describe('_teamsComponent', () => {
  let component: _teamsComponent;
  let fixture: ComponentFixture<_teamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ _teamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(_teamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
