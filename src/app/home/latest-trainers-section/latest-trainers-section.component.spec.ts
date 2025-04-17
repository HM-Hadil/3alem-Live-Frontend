import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTrainersSectionComponent } from './latest-trainers-section.component';

describe('LatestTrainersSectionComponent', () => {
  let component: LatestTrainersSectionComponent;
  let fixture: ComponentFixture<LatestTrainersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTrainersSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestTrainersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
