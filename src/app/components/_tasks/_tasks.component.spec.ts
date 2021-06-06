/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { _tasksComponent } from './_tasks.component';

describe('_tasksComponent', () => {
  let component: _tasksComponent;
  let fixture: ComponentFixture<_tasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ _tasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(_tasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
