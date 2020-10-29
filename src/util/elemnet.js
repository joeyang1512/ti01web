import delegate from 'delegate';

export const is = (element, selector) => {
  if ((typeof selector).toLowerCase() === 'function') {
    return !!selector(element);
  } else {
    return (element.matches) ? element.matches(selector) : element.matchesSelector(selector);
  }
};

export { delegate };
