import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbookdialogComponent } from './adminbookdialog.component';

describe('AdminbookdialogComponent', () => {
  let component: AdminbookdialogComponent;
  let fixture: ComponentFixture<AdminbookdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminbookdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbookdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
