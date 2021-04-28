import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenggunaComponent } from './pengguna.component';

describe('PenggunaComponent', () => {
  let component: PenggunaComponent;
  let fixture: ComponentFixture<PenggunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenggunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
