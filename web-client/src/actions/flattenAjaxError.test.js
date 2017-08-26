// @flow
import flattenAjaxError from './flattenAjaxError';

describe('flattenAjaxError', () => {
  test('flattens error string', () => {
    expect(flattenAjaxError('1')).toEqual({ _error: '1' });
  });

  test('flatten error object with plain string error values', () => {
    expect(flattenAjaxError({
      ab: '1', cd: '2',
    }))
      .toEqual({
        ab: 'Ab: 1',
        cd: 'Cd: 2',
      });
  });

  test('flatten error object with array of string error values', () => {
    expect(flattenAjaxError({
      ab: ['1', '2'], cd: ['3', '4'],
    }))
      .toEqual({
        ab: 'Ab: 1\n2',
        cd: 'Cd: 3\n4',
      });
  });
});
