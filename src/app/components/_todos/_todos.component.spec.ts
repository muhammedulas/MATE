/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { _todosComponent } from './_todos.component';

describe('_todosComponent', () => {
  let component: _todosComponent;
  let fixture: ComponentFixture<_todosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ _todosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(_todosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
