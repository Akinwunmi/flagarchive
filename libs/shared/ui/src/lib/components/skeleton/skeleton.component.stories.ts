import type { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from './skeleton.component';
import { expect } from '@storybook/jest';

const meta: Meta<SkeletonComponent> = {
  tags: ['autodocs'],
  component: SkeletonComponent,
  title: 'Components/Skeleton',
  args: {
    loading: false,
    soft: false,
  },
  render: (props) => {
    return {
      props,
      styles: [
        `
          flag-skeleton {
            height: var(--flag-space-5xl);
            max-width: 25rem;
          }
        `,
      ],
      template: `
        <flag-skeleton
          ${props.loading ? '[loading]="true"' : ''}
          ${props.soft ? '[soft]="true"' : ''}
        />`,
    };
  },
};
export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('flag-skeleton');
    expect(skeleton).not.toHaveClass('loading');
    expect(skeleton).not.toHaveClass('soft');
  },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('flag-skeleton');
    expect(skeleton).toHaveClass('loading');
    expect(skeleton).not.toHaveClass('soft');
  },
};

export const Soft: Story = {
  args: { soft: true },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('flag-skeleton');
    expect(skeleton).not.toHaveClass('loading');
    expect(skeleton).toHaveClass('soft');
  },
};
