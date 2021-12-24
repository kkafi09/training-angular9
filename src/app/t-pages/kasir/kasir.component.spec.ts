import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KasirComponent } from './kasir.component';

describe('KasirComponent', () => {
  let component: KasirComponent;
  let fixture: ComponentFixture<KasirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KasirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
