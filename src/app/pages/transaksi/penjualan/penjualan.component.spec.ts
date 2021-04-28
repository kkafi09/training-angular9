import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanComponent } from './penjualan.component';

describe('PenjualanComponent', () => {
  let component: PenjualanComponent;
  let fixture: ComponentFixture<PenjualanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenjualanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
