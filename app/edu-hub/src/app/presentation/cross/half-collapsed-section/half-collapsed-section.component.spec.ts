import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfCollapsedSectionComponent } from './half-collapsed-section.component';

describe('HalfCollapsedSectionComponent', () => {
  let component: HalfCollapsedSectionComponent;
  let fixture: ComponentFixture<HalfCollapsedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfCollapsedSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfCollapsedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
