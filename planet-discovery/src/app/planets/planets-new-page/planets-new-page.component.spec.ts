import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsNewPageComponent } from './planets-new-page.component';

describe('PlanetsNewPageComponent', () => {
  let component: PlanetsNewPageComponent;
  let fixture: ComponentFixture<PlanetsNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
