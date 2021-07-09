import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveRestaurantComponent } from './reserve-restaurant.component';

describe('ReserveRestaurantComponent', () => {
  let component: ReserveRestaurantComponent;
  let fixture: ComponentFixture<ReserveRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
