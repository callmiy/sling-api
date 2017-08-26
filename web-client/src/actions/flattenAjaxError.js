// @flow

export default (error: Object): Object => {
  if (typeof error === 'string') {
    return { _error: error };
  }

  return Object.keys(error)
    .reduce((acc: Object, key: string) => {
      const values = error[key];
      const name = key[0].toUpperCase() + key.slice(1);

      if (typeof values.map !== 'function') {
        acc[key] = `${name}: ${values}`;
      } else {
        acc[key] = `${name}: ${values.join('\n')}`;
      }

      return acc;
    }, {});
};
