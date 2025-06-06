import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'flag-tab',
  templateUrl: './tab.component.html',
})
export class TabComponent implements OnInit {
  readonly #viewContainerRef = inject(ViewContainerRef);

  panelTemplate = viewChild.required<TemplateRef<unknown>>('panel');

  #panel: TemplatePortal | null = null;

  get panel(): TemplatePortal | null {
    return this.#panel;
  }

  label = input.required<string>();

  active = false;
  id = crypto.randomUUID();

  ngOnInit(): void {
    this.#panel = new TemplatePortal(this.panelTemplate(), this.#viewContainerRef);
  }
}
