import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MBarangComponent } from './m-barang.component';

describe('MBarangComponent', () => {
  let component: MBarangComponent;
  let fixture: ComponentFixture<MBarangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MBarangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
