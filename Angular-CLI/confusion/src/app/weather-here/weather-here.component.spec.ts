import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHereComponent } from './weather-here.component';

describe('WeatherHereComponent', () => {
  let component: WeatherHereComponent;
  let fixture: ComponentFixture<WeatherHereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherHereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
