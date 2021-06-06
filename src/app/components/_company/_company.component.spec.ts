/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { _companyComponent } from './_company.component';

describe('_companyComponent', () => {
  let component: _companyComponent;
  let fixture: ComponentFixture<_companyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ _companyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(_companyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
