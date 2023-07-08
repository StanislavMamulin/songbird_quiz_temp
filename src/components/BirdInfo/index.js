import './styles.css';
import { BirdPlayer } from '../BirdPlayer';

const birdPlayer = new BirdPlayer();

const addPlayer = () => {
  const birdInfoElement = document.querySelector('.bird-info');

  const birdPlayerElement = birdPlayer.player;
  const birdImage = birdPlayerElement.querySelector('.bird-image');
  const playButton = birdPlayerElement.querySelector('.playpause');
  const seekSlider = birdPlayerElement.querySelector('.seek-slider');

  birdPlayerElement.classList.add('bird-player_vertical');
  birdImage.classList.add('bird-image_vertical');
  playButton.classList.add('playpause_vertical');
  seekSlider.classList.add('seek-slider_vertical');

  birdInfoElement.append(birdPlayerElement);
  birdPlayerElement.style.display = 'none';

  birdPlayer.initPlayer();
};

const addTextBlock = () => {
  const birdInfoElement = document.querySelector('.bird-info');

  const birdDescriptionElement = document.createElement('div');
  birdDescriptionElement.classList.add('bird-info__description');
  birdDescriptionElement.style.display = 'none';
  birdInfoElement.append(birdDescriptionElement);
};

const toggleTextStub = (show = true) => {
  const birdInfoElement = document.querySelector('.bird-info');
  const playerElement = birdInfoElement.querySelector('.bird-player');
  const stubElement = document.querySelector('.bird-info__stub');
  const descriptionElement = document.querySelector('.bird-info__description');

  playerElement.style.display = show ? 'none' : 'flex';
  stubElement.style.display = show ? 'flex' : 'none';
  descriptionElement.style.display = show ? 'none' : 'flex';
};

export const initBirdInfo = () => {
  addPlayer();
  addTextBlock();
  toggleTextStub(true);
};

const changeDescription = (text) => {
  const descriptionElement = document.querySelector('.bird-info__description');
  descriptionElement.innerText = text;
  descriptionElement.scrollTop = 0;
};

const changePlayerInfo = (birdInfo) => {
  birdPlayer.changeTheBird(birdInfo);
  birdPlayer.showFullInfo();
};

export const changeBird = (birdInfo) => {
  toggleTextStub(false);
  const { description } = birdInfo;

  changeDescription(description);
  changePlayerInfo(birdInfo);
};
