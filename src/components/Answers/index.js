import './styles.css';
import { AnswerButton, setStatus } from '../AnswerButton/index';

let buttons = [];

export const generateAnswersList = (answers = [], answerClickHandler = () => {}) => {
  const answersElement = document.querySelector('.answers');
  buttons = [];
  answersElement.replaceChildren();

  answers.forEach((answer) => {
    const answerButton = AnswerButton({ title: answer, onclick: answerClickHandler });
    answersElement.append(answerButton);
    buttons.push(answerButton);
  });
};

export const setStatusForButton = (birdName, status) => {
  const selectedButton = buttons.find((button) => {
    const titleElement = button.querySelector('.answer-item__title');
    return titleElement.innerText === birdName;
  });

  if (selectedButton) {
    setStatus(selectedButton, status);
  }
};
