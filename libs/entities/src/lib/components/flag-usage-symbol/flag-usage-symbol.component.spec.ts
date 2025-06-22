import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagCategory } from '@flagarchive/advanced-search';

import { FlagUsageSymbolComponent } from './flag-usage-symbol.component';

describe(FlagUsageSymbolComponent.name, () => {
  let component: FlagUsageSymbolComponent;
  let fixture: ComponentFixture<FlagUsageSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagUsageSymbolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagUsageSymbolComponent);
    fixture.componentRef.setInput('categories', [
      FlagCategory.NationalFlag,
      FlagCategory.NavalEnsign,
    ]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
