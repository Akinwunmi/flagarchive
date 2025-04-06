import { HyphenatePipe } from './hyphenate.pipe';

describe(HyphenatePipe.name, () => {
  it('create an instance', () => {
    const pipe = new HyphenatePipe();
    expect(pipe).toBeTruthy();
  });
});
