import { Component, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

import { SidepanelComponent } from './sidepanel.component';
import { SidepanelService } from './sidepanel.service';

export type StoryArgs = SidepanelComponent;

@Component({
  imports: [SidepanelComponent],
  selector: 'flag-host-component',
  styles: [
    `
      .content {
        padding: var(--flag-space-sm);
      }
    `,
  ],
  template: `
    <button flag-button raised (click)="open()">Open sidepanel</button>

    <ng-template #sidepanel>
      <flag-sidepanel title="Edit entity" icon="category" [large]="true">
        <p class="content">This is the content of the sidepanel.</p>
      </flag-sidepanel>
    </ng-template>
  `,
})
class HostComponent {
  #sidepanelService = inject(SidepanelService);
  #viewContainerRef = inject(ViewContainerRef);

  sidepanel = viewChild.required<TemplateRef<SidepanelComponent>>('sidepanel');

  close() {
    this.#sidepanelService.close();
  }

  open() {
    this.#sidepanelService.open(this.sidepanel(), this.#viewContainerRef).subscribe();
  }
}

const meta: Meta<StoryArgs> = {
  tags: ['autodocs'],
  component: SidepanelComponent,
  title: 'Components/Sidepanel',
  render: (args) => {
    return {
      moduleMetadata: {
        imports: [HostComponent],
      },
      props: args,
      template: `
        <flag-host-component />
      `,
    };
  },
  args: {},
  argTypes: {},
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
