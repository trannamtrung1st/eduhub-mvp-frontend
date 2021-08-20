import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasPageComponent } from './medias-page.component';

describe('MediasPageComponent', () => {
  let component: MediasPageComponent;
  let fixture: ComponentFixture<MediasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediasPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
