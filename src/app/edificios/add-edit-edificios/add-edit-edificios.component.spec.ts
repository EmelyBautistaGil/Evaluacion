import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEdificiosComponent } from './add-edit-edificios.component';

describe('AddEditEdificiosComponent', () => {
  let component: AddEditEdificiosComponent;
  let fixture: ComponentFixture<AddEditEdificiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEdificiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
