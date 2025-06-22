import { Component } from '@angular/core';

import { IconComponent } from '../icon';
import { TooltipDirective } from './tooltip.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [IconComponent, TooltipDirective],
  selector: 'flag-host',
  template: ` <flag-icon flagTooltip="This is a tooltip">info</flag-icon> `,
})
class HostComponent {}

describe(TooltipDirective.name, () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HostComponent, TooltipDirective],
    }).createComponent(HostComponent);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const icon = fixture.debugElement.query(By.css('flag-icon[flagTooltip]'));
    expect(icon).toBeTruthy();
  });
});
