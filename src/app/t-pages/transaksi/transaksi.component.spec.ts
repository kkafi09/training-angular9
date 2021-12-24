import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaksiComponent } from './transaksi.component';

describe('TransaksiComponent', () => {
  let component: TransaksiComponent;
  let fixture: ComponentFixture<TransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
