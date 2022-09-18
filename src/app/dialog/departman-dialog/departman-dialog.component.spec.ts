import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanDialogComponent } from './departman-dialog.component';

describe('DepartmanDialogComponent', () => {
  let component: DepartmanDialogComponent;
  let fixture: ComponentFixture<DepartmanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
