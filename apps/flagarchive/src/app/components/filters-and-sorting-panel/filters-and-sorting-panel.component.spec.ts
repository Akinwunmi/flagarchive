import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersAndSortingPanelComponent } from './filters-and-sorting-panel.component';

describe('FiltersAndSortingPanelComponent', () => {
  let component: FiltersAndSortingPanelComponent;
  let fixture: ComponentFixture<FiltersAndSortingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersAndSortingPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersAndSortingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
