/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Dialog_contactComponent } from './dialog_contact.component';

describe('Dialog_contactComponent', () => {
  let component: Dialog_contactComponent;
  let fixture: ComponentFixture<Dialog_contactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dialog_contactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dialog_contactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
