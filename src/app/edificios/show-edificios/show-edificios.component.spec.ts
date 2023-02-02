import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEdificiosComponent } from './show-edificios.component';

describe('ShowEdificiosComponent', () => {
  let component: ShowEdificiosComponent;
  let fixture: ComponentFixture<ShowEdificiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEdificiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEdificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
