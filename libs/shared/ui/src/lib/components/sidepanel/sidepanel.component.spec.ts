import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidepanelComponent } from './sidepanel.component';

describe(SidepanelComponent.name, () => {
  let component: SidepanelComponent;
  let fixture: ComponentFixture<SidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidepanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidepanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Sidepanel');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
