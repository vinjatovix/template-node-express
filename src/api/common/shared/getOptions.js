const getOptions = (options = {}) => {
  const {
    delay = 0,
    select = null,
    session = null,
    populate = null,
    sort = null,
    lean,
    json = true,
    pagination
  } = options;

  const hasPopulation = Array.isArray(populate)
    ? populate.some(query => query.populate)
    : populate && populate.populate;

  return {
    delay,
    select: select && _cleanSelect(select),
    session,
    populate,
    sort,
    json,
    lean: lean === undefined ? !hasPopulation : lean,
    ...pagination
  };
};
const _cleanSelect = select => {
  const selectSet = new Set();
  const mostSpecific = [];

  for (const selection of select) {
    const keys = selection.split(".");
    let composedKey = "";

    for (const key of keys) {
      composedKey = composedKey ? `${composedKey}.${key}` : key;
      if (selectSet.has(composedKey)) {
        selectSet.delete(composedKey);
      }
      selectSet.add(composedKey);
    }

    if (!mostSpecific.includes(keys[0])) {
      mostSpecific.push(keys[0]);
    }
  }

  return mostSpecific.length > 0 ? mostSpecific : null;
};

module.exports = {
  getOptions
};
