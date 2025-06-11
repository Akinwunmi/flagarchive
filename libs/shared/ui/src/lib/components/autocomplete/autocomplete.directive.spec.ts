import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteDirective } from './autocomplete.directive';

@Component({
  imports: [AutocompleteComponent, AutocompleteDirective],
  template: `
    <input type="search" [flagAutocomplete]="autocomplete" />
    <flag-autocomplete #autocomplete [options]="options()" />
  `,
})
class TestComponent {
  options = signal([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]);
}

describe(AutocompleteDirective.name, () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AutocompleteDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.query(By.directive(AutocompleteDirective));

    expect(directive).toBeTruthy();
  });
});
