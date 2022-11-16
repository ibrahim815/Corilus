import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReunionComponent } from './update-reunion.component';

describe('UpdateReunionComponent', () => {
  let component: UpdateReunionComponent;
  let fixture: ComponentFixture<UpdateReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
