import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviterComponent } from './inviter.component';

describe('InviterComponent', () => {
  let component: InviterComponent;
  let fixture: ComponentFixture<InviterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
