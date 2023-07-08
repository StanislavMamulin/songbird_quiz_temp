import { birdsData } from '../../data/birds';
import { shuffleTheArray, getRandomArrayItem } from '../../utils/array';

export const getTitleFromAnswerButton = (event) => {
  const buttonElement = event.currentTarget;
  const title = buttonElement.querySelector('.answer-item__title').innerText;

  return title;
};

export const getAnswersForCategory = (categoryIndex = 0) => (
  shuffleTheArray(birdsData[categoryIndex].map((birdInfo) => birdInfo.name))
);

export const getInfoAboutBird = (categoryIndex = 0, birdName = '') => (
  birdsData[categoryIndex].find((birdInfo) => birdInfo.name === birdName)
);

export const getRandomBirdFromCategory = (categoryIndex = 0) => (
  getRandomArrayItem(birdsData[categoryIndex])
);
