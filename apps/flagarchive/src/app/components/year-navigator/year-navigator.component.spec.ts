import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { YearNavigatorComponent } from './year-navigator.component';

describe('YearNavigatorComponent', () => {
  let component: YearNavigatorComponent;
  let fixture: ComponentFixture<YearNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearNavigatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YearNavigatorComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    const currentYear = new Date().getFullYear();
    fixture.componentRef.setInput('max', currentYear);
    fixture.componentRef.setInput('min', 2019);
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should have 2021 as selected year', () => {
    setup();
    component.setSelectedYear(2021);
    expect(component.selectedYear()).toBe(2021);
  });

  it('should decrease selected year by 1', () => {
    setup();
    component.setSelectedYear(2021);
    component.previous();
    expect(component.selectedYear()).toBe(2020);
  });

  it('should increase selected year by 1', () => {
    setup();
    component.setSelectedYear(2021);
    component.next();
    expect(component.selectedYear()).toBe(2022);
  });

  it('should play and stop', () => {
    setup();
    expect(component.isPlaying()).toEqual(false);
    component.play();
    expect(component.isPlaying()).toEqual(true);
    component.stop();
    expect(component.isPlaying()).toEqual(false);
  });

  it('should stop when max year is reached', fakeAsync(() => {
    setup();
    component.setSelectedYear(2021);
    fixture.componentRef.setInput('max', 2021);
    component.play();
    tick(750);
    expect(component.isPlaying()).toEqual(false);
  }));

  it('should stop when min year is reached', fakeAsync(() => {
    setup();
    component.setSelectedYear(2021);
    fixture.componentRef.setInput('min', 2021);
    component.play(true);
    tick(750);
    expect(component.isPlaying()).toEqual(false);
  }));

  it('should set dropdown state', () => {
    setup();
    component.setDropdownState();
    expect(component.dropdownIsOpen).toEqual(true);
    expect(component.isPlaying()).toEqual(false);
  });
});
