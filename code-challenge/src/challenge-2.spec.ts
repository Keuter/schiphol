import { removeOppositeChars } from './challenge-2';

describe('removeOppositeChars', () => {

  const smallTest = 'dabAcCaCBAcCcaDA';
  const ultimateTest = 'VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn';

  it('Should return "dabCBAcaDA"', () => {
    expect(removeOppositeChars(smallTest)).toBe('dabCBAcaDA');
  });

  it('Should return "yNtVn", the outcome when I manually removed opposite chars ;)', () => {
    expect(removeOppositeChars(ultimateTest)).toBe('yntvn');
   });

});
