import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonimportComponent } from './buttonimport.component';

describe('ButtonimportComponent', () => {
  let component: ButtonimportComponent;
  let fixture: ComponentFixture<ButtonimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
