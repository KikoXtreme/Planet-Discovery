import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsLatestComponent } from './planets-latest.component';

describe('PlanetsLatestComponent', () => {
  let component: PlanetsLatestComponent;
  let fixture: ComponentFixture<PlanetsLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsLatestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
