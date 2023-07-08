export const shuffleTheArray = (array) => array
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

export const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];
