import { HtmlSanitizedPipe } from './html-sanitized.pipe';

describe('HtmlSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlSanitizedPipe();
    expect(pipe).toBeTruthy();
  });
});
