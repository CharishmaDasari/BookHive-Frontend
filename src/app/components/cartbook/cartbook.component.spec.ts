import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartbookComponent } from './cartbook.component';

describe('CartbookComponent', () => {
  let component: CartbookComponent;
  let fixture: ComponentFixture<CartbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
