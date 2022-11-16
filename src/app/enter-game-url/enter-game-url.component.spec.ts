import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGameUrlComponent } from './enter-game-url.component';

describe('EnterGameUrlComponent', () => {
  let component: EnterGameUrlComponent;
  let fixture: ComponentFixture<EnterGameUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterGameUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGameUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
