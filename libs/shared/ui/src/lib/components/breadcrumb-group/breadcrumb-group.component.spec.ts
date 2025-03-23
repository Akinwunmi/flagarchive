import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbGroupComponent } from './breadcrumb-group.component';

describe('BreadcrumbGroupComponent', () => {
  let component: BreadcrumbGroupComponent;
  let fixture: ComponentFixture<BreadcrumbGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
