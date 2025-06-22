import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tooltip.component.css',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  message = input.required<string>();
}
