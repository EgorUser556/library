export const debounce = (callback, delay) => {
  let timeoutId = null;
  const debounced = (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
  debounced.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
};
