import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENTITIES_STUB } from '../../mocks';

import { FlagImageComponent } from './flag-image.component';

describe('FlagImageComponent', () => {
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
    fixture.componentRef.setInput('src', ENTITIES_STUB[0].flags?.official.url);
    fixture.componentRef.setInput('alt', ENTITIES_STUB[0].translationKey);
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
