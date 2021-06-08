import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObjectivesComponent } from './view-objectives.component';

describe('ViewObjectivesComponent', () => {
  let component: ViewObjectivesComponent;
  let fixture: ComponentFixture<ViewObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewObjectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
