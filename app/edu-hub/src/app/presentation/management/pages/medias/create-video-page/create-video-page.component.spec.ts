import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVideoPageComponent } from './create-video-page.component';

describe('CreateVideoPageComponent', () => {
  let component: CreateVideoPageComponent;
  let fixture: ComponentFixture<CreateVideoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVideoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
