import { CategoryItem, activateCategory, disableCategory } from '../../../components/CategoryItem/index';
import { quizCategories } from '../../../data/birds';
import { generateAnswersList } from '../../../components/Answers';
import { initBirdInfo } from '../../../components/BirdInfo';

const categories = [];

const fillInTheCategoriesList = () => {
  const categoriesListElement = document.querySelector('.question-categories');

  quizCategories.forEach((category) => {
    const categoryItem = CategoryItem({ title: category });
    categoriesListElement.append(categoryItem);
    categories.push(categoryItem);
  });
};

const addPlayer = (player) => {
  const currentQuestionElement = document.querySelector('.current-question');
  currentQuestionElement.append(player.player);
  player.initPlayer();
};

const addBirdInfo = () => {
  initBirdInfo();
};

export const makeQuizUI = (player, answersList = [], answerClickHandler = () => {}) => {
  fillInTheCategoriesList();
  addPlayer(player);
  generateAnswersList(answersList, answerClickHandler);
  addBirdInfo();
};

export const setActiveCategory = (categoryIndex) => {
  categories.forEach((category) => disableCategory(category));
  activateCategory(categories[categoryIndex]);
};

export const setScore = (score) => {
  const scoreElement = document.querySelector('.top-panel__info__score');
  scoreElement.innerText = `Score: ${score}`;
};
