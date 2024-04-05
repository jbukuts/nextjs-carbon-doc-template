import { describe } from 'node:test';
import { expect, test } from 'vitest';
import { toHoursAndMinutes, isURLAbsolute } from '#/lib/helpers';

describe('helpers', () => {
  describe('toHoursAndMinutes', () => {
    test('input over 1 hour', () => {
      const output = toHoursAndMinutes(70);

      expect(output).toBe('1 hr 10 min');
    });

    test('input under 1 hour', () => {
      const output = toHoursAndMinutes(25);

      expect(output).toBe('25 min');
    });

    test('input exactly 2 hours', () => {
      const output = toHoursAndMinutes(120);

      expect(output).toBe('2 hrs');
    });
  });

  describe('isURLAbsolute', () => {
    test('mailto URI', () => {
      const output = isURLAbsolute('mailto:ibm@ibm.com');
      expect(output).toBe(true);
    });

    test('direct URL', () => {
      const output = isURLAbsolute('https://ibm.com');
      expect(output).toBe(true);
    });

    test('no protocol', () => {
      const output = isURLAbsolute('//ibm.com');
      expect(output).toBe(true);
    });

    test('relative URL', () => {
      const a = isURLAbsolute('/relative/item');
      expect(a).toBe(false);

      const b = isURLAbsolute('item');
      expect(b).toBe(false);
    });
  });
});
