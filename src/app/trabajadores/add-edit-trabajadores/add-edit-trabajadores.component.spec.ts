import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrabajadoresComponent } from './add-edit-trabajadores.component';

describe('AddEditTrabajadoresComponent', () => {
  let component: AddEditTrabajadoresComponent;
  let fixture: ComponentFixture<AddEditTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTrabajadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
