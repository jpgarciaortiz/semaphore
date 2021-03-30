import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlightsComponent } from './tlights.component';

describe('TlightsComponent', () => {
  let component: TlightsComponent;
  let fixture: ComponentFixture<TlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
