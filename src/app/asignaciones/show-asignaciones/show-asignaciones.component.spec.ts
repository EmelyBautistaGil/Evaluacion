import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAsignacionesComponent } from './show-asignaciones.component';

describe('ShowAsignacionesComponent', () => {
  let component: ShowAsignacionesComponent;
  let fixture: ComponentFixture<ShowAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAsignacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
