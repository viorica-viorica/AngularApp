import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristicObjectivesComponent } from './touristic-objectives.component';

describe('TouristicObjectivesComponent', () => {
  let component: TouristicObjectivesComponent;
  let fixture: ComponentFixture<TouristicObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TouristicObjectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristicObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
