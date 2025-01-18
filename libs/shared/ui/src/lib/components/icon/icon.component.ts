import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'lib-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'material-symbols-rounded',
  },
})
export class IconComponent implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }

    const height = getComputedStyle(this.elementRef.nativeElement).fontSize;
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', height);
  }
}
