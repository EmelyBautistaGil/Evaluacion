import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAsignacionesComponent } from './add-edit-asignaciones.component';

describe('AddEditAsignacionesComponent', () => {
  let component: AddEditAsignacionesComponent;
  let fixture: ComponentFixture<AddEditAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAsignacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
