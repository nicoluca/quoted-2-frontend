import { Quote } from './quote';
import { Source } from './source';

describe('Quote', () => {
  it('should create an instance', () => {
    const source = new Source(1, 'test');
    expect(new Quote(1, 'test', source)).toBeTruthy();
  });
});
