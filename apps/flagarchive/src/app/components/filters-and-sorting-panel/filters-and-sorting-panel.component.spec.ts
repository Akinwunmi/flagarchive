import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSidePanelComponent } from './filters-and-sorting-panel.component';

describe('FilterSidePanelComponent', () => {
  let component: FilterSidePanelComponent;
  let fixture: ComponentFixture<FilterSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSidePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
