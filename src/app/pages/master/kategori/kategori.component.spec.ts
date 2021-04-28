import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriComponent } from './kategori.component';

describe('KategoriComponent', () => {
  let component: KategoriComponent;
  let fixture: ComponentFixture<KategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
