import { makeQuizUI } from '../../scripts/quiz/ui/ui';
import { answerClickHandler, getAnswersForCurrentCategory, startTheGame } from '../../scripts/quiz/gamelogic';
import 'normalize.css';
import './style.css';
import '../../styles/quiz/top-panel.css';
import '../../styles/colors.css';
import '../../styles/commonlayout.css';
import { BirdPlayer } from '../../components/BirdPlayer';
import logo from '../../assets/vectors/logo.svg';

export const questionPlayer = new BirdPlayer();

const answers = getAnswersForCurrentCategory();
makeQuizUI(questionPlayer, answers, answerClickHandler);
startTheGame(questionPlayer);
