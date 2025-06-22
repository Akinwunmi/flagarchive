import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagImageComponent } from './flag-image.component';

describe(FlagImageComponent.name, () => {
  let component: FlagImageComponent;
  let fixture: ComponentFixture<FlagImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagImageComponent);
    component = fixture.componentInstance;
  });

  function setup() {
    fixture.componentRef.setInput('src', 'https://flagarchive.com/');
    fixture.componentRef.setInput('alt', 'Test alt');
    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    expect(component).toBeTruthy();
  });

  it('should handle image error', () => {
    setup();
    component.handleImageError();

    expect(component.placeholderClass()).toEqual(true);
  });

  it('should handle image load', () => {
    setup();
    component.handleImageLoad();

    expect(component.placeholderClass()).toEqual(false);
  });
});
