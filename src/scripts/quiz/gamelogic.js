import {
  getTitleFromAnswerButton,
  getAnswersForCategory,
  getRandomBirdFromCategory,
  getInfoAboutBird,
} from './getdata';
import { quizCategories } from '../../data/birds';
import { answerStatuses } from '../../data/statuses';
import { generateAnswersList, setStatusForButton } from '../../components/Answers/index';
import { setActiveCategory, setScore } from './ui/ui';
import { playCorrectAnswerSound, playWrongAnswerSound } from './sounds';
import { changeBird } from '../../components/BirdInfo';
import { Button } from '../../components/Button';

const INITIAL_QUESTION_SCORE = 5;

let currentCategoryIndex = 0;
let currentBird;
let isAnswerFinded = false;
let currentPlayer;
const nextButton = new Button();
let score = 0;
let currentQuestionScore = INITIAL_QUESTION_SCORE;

export const answerClickHandler = (title) => {
  // change bird in birdInfo
  const birdName = getTitleFromAnswerButton(title);
  const selectedBird = getInfoAboutBird(currentCategoryIndex, birdName);
  changeBird(selectedBird);

  if (isAnswerFinded) {
    return;
  }

  if (birdName === currentBird.name) { // correct answer
    setStatusForButton(birdName, answerStatuses.correct);
    isAnswerFinded = true;
    currentPlayer.showRightAnswer();
    currentPlayer.pauseSong();
    playCorrectAnswerSound();
    nextButton.makeActive();
    score += currentQuestionScore;
    setScore(score);
    currentQuestionScore = INITIAL_QUESTION_SCORE;
  } else { // wrong answer
    setStatusForButton(birdName, answerStatuses.wrong);
    playWrongAnswerSound();
    currentQuestionScore -= 1;
  }
};

export const getAnswersForCurrentCategory = () => getAnswersForCategory(currentCategoryIndex);

export const switchToNextCategory = () => {
  if (!nextButton.isActive) {
    return;
  }

  if (currentCategoryIndex >= quizCategories.length - 1) {
    currentCategoryIndex = 0;
    // finish game
  } else {
    currentCategoryIndex += 1;
    currentBird = getRandomBirdFromCategory(currentCategoryIndex);
    currentPlayer.changeTheBird(currentBird);
    setActiveCategory(currentCategoryIndex);
    const answers = getAnswersForCurrentCategory();
    generateAnswersList(answers, answerClickHandler);
    isAnswerFinded = false;
    nextButton.disableButton();
  }
};

const initNextButton = () => {
  nextButton.setElement('.next-question');
  nextButton.disableButton();
  nextButton.setOnclickHandler(switchToNextCategory);
};

export const startTheGame = (player) => {
  currentBird = getRandomBirdFromCategory(currentCategoryIndex);
  currentPlayer = player;
  player.changeTheBird(currentBird);
  setActiveCategory(currentCategoryIndex);

  initNextButton();
};
