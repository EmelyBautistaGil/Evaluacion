import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrabajadoresComponent } from './show-trabajadores.component';

describe('ShowTrabajadoresComponent', () => {
  let component: ShowTrabajadoresComponent;
  let fixture: ComponentFixture<ShowTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
