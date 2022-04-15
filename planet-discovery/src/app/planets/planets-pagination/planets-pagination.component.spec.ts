import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsPaginationComponent } from './planets-pagination.component';

describe('PlanetsPaginationComponent', () => {
  let component: PlanetsPaginationComponent;
  let fixture: ComponentFixture<PlanetsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
