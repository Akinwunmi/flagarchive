import { HighlightPipe } from './highlight.pipe';

describe(HighlightPipe.name, () => {
  it('create an instance', () => {
    const pipe = new HighlightPipe();
    expect(pipe).toBeTruthy();
  });
});
