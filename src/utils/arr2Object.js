module.exports = {
  array2Object: (array, key = 'id', toLowerCase) => {
    const result = {};

    if (!array || !array.length) {
      return;
    }

    array.forEach((item) => {
      if ((/\./).test(key)) {
        let newKey = item;

        key.split('.').forEach((itemKey) => {
          if (itemKey in newKey) {
            newKey = newKey[itemKey];
          }
        });

        if (
          typeof newKey === 'number' ||
                    typeof newKey === 'string' ||
                    typeof newKey === 'boolean'
        ) {
          result[newKey] = item;
        }
      } else {
        const _key = toLowerCase && item[key].toLowerCase() || item[key];

        result[_key] = item;
      }
    });

    return result;
  }
};
