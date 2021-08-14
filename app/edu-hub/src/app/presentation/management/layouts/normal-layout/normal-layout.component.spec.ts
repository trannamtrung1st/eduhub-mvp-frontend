import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalLayoutComponent } from './normal-layout.component';

describe('NormalLayoutComponent', () => {
  let component: NormalLayoutComponent;
  let fixture: ComponentFixture<NormalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
