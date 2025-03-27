import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterAndSortBarComponent } from './filter-and-sort-bar.component';

describe('FilterAndSortBarComponent', () => {
  let component: FilterAndSortBarComponent;
  let fixture: ComponentFixture<FilterAndSortBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAndSortBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterAndSortBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
