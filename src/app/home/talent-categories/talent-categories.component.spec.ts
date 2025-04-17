import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentCategoriesComponent } from './talent-categories.component';

describe('TalentCategoriesComponent', () => {
  let component: TalentCategoriesComponent;
  let fixture: ComponentFixture<TalentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
