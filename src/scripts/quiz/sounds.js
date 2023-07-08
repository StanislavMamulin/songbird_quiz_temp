import correctSound from '../../assets/sounds/success.mp3';
import wrongSound from '../../assets/sounds/fail.mp3';

const correctAnswerSound = document.createElement('audio');
const wrongAnswerSound = document.createElement('audio');

correctAnswerSound.src = correctSound;
wrongAnswerSound.src = wrongSound;
correctAnswerSound.load();
wrongAnswerSound.load();

const stopPrevSound = () => {
  correctAnswerSound.pause();
  correctAnswerSound.currentTime = 0;

  wrongAnswerSound.pause();
  wrongAnswerSound.currentTime = 0;
};

export const playCorrectAnswerSound = () => {
  stopPrevSound();
  correctAnswerSound.play();
};

export const playWrongAnswerSound = () => {
  stopPrevSound();
  wrongAnswerSound.play();
};
