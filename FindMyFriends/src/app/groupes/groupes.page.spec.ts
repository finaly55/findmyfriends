import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesPage } from './groupes.page';

describe('GroupesPage', () => {
  let component: GroupesPage;
  let fixture: ComponentFixture<GroupesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
