export const removeElementFromArray = <T>(
  array: T[],
  index: number,
  value: T,
) => {
  const innerArray = [...array];
  const newIndex = index || innerArray.indexOf(value);

  if (newIndex >= 0) {
    innerArray.splice(newIndex, 1);
  }

  return innerArray;
};

export const replaceElementInArray = <T>(
  array: T[],
  index: number,
  newValue: T,
) => {
  const innerArray = [...array];

  innerArray.splice(index, 1, newValue);

  return innerArray;
};

export const replacePropertyInArray = <T, T2>(
  array: T[],
  index: number,
  newValue: T2,
  property: string,
) => {
  const newObject = { ...array[index], [property]: newValue };

  return replaceElementInArray(array, index, newObject);
};

export const mergeArrayAtIndex = <T>(arr: T[], index: number, newItem: T) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
