import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleATripComponent } from './schedule-a-trip.component';

describe('ScheduleATripComponent', () => {
  let component: ScheduleATripComponent;
  let fixture: ComponentFixture<ScheduleATripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleATripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleATripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
