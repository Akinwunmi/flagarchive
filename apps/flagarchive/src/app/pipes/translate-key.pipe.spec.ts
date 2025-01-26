import { TranslationKeyPipe } from './translation-key.pipe';

describe(TranslationKeyPipe.name, () => {
  it('create an instance', () => {
    const pipe = new TranslationKeyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a dash if key is undefined', () => {
    const pipe = new TranslationKeyPipe();
    expect(pipe.transform('prefix')).toBe('\u2014');
  });
});
