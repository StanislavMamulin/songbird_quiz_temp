import { htmlToElement } from '../../utils/htmlToElement';
import { getTwoDigitsNumber } from '../../utils/text';
import './styles.css';
import birdPlayer from './index.html';

import pauseIcon from '../../assets/vectors/circle-pause.svg';
import playIcon from '../../assets/vectors/circle-play.svg';
import secretBird from '../../assets/images/bird-silhouettes.png';

const SECRET_BIRD_NAME = '* * * * * * * *';
const DEFAULT_LATIN_NAME = '';

export class BirdPlayer {
  constructor() {
    this.player = htmlToElement(birdPlayer);

    this.currSong = document.createElement('audio');
    this.isPlaying = false;
    this.curBirdName = '';
    this.curBirdLatinName = '';
  }

  setElements = () => {
    this.seekSliderElement = this.player.querySelector('.seek-slider__slider');
    this.currentTimeElement = this.player.querySelector('.seek-slider__current-time');
    this.totalTimeElement = this.player.querySelector('.seek-slider__total-time');

    this.playPauseElement = this.player.querySelector('.playpause');
    this.playPauseImageElement = this.player.querySelector('.playpause__image');
    this.soundSliderElement = this.player.querySelector('.sound-slider__slider');

    this.birdImageElement = this.player.querySelector('.bird-image');
    this.birdNameElement = this.player.querySelector('.bird-name');
    this.birdLatinNameElement = this.player.querySelector('.bird-lat-name');
  };

  resetValues = () => {
    this.currentTimeElement.textContent = '00:00';
    this.totalTimeElement.textContent = '00:00';
    this.seekSliderElement.value = 0;
  };

  seekUpdate = () => {
    if (!Number.isNaN(this.currSong.duration)) {
      const seekPosition = this.currSong.currentTime * (100 / this.currSong.duration);
      this.seekSliderElement.value = seekPosition;

      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(this.currSong.currentTime / 60);
      let currentSeconds = Math.floor(this.currSong.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(this.currSong.duration / 60);
      let durationSeconds = Math.floor(this.currSong.duration - durationMinutes * 60);

      currentMinutes = getTwoDigitsNumber(currentMinutes);
      currentSeconds = getTwoDigitsNumber(currentSeconds);
      durationMinutes = getTwoDigitsNumber(durationMinutes);
      durationSeconds = getTwoDigitsNumber(durationSeconds);

      // Display the updated duration
      this.currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
      this.totalTimeElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  };

  loadSong = (audioPath) => {
    clearInterval(this.updateTimer);
    this.resetValues();

    this.currSong.src = audioPath;
    this.currSong.load();
    this.updateTimer = setInterval(this.seekUpdate, 1000);
  };

  playSong = () => {
    this.currSong.play();
    this.isPlaying = true;

    this.playPauseImageElement.src = pauseIcon;
  };

  pauseSong = () => {
    this.currSong.pause();
    this.isPlaying = false;

    this.playPauseImageElement.src = playIcon;
  };

  playpauseSong = () => {
    if (this.isPlaying) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  };

  seekTo = () => {
    const seekPostition = this.currSong.duration * (this.seekSliderElement.value / 100);
    this.currSong.currentTime = seekPostition;
  };

  setVolume = () => {
    this.currSong.volume = this.soundSliderElement.value / 100;
  };

  addEventListeners = () => {
    this.playPauseElement.addEventListener('click', this.playpauseSong);
    this.soundSliderElement.addEventListener('change', this.setVolume);
    this.seekSliderElement.addEventListener('change', this.seekTo);
  };

  showBirdInfo = (birdInfo) => {
    const {
      imagePath = '',
      birdName = '',
      birdLatinName = '',
    } = birdInfo;

    this.birdImageElement.src = imagePath;
    this.birdNameElement.textContent = birdName;
    this.birdLatinNameElement.textContent = birdLatinName;
  };

  showRightAnswer = () => {
    this.showBirdInfo({
      imagePath: this.curBirdImagePath,
      birdName: this.curBirdName,
    });
  };

  showFullInfo = () => {
    this.showBirdInfo({
      imagePath: this.curBirdImagePath,
      birdName: this.curBirdName,
      birdLatinName: this.curBirdLatinName,
    });
  };

  hideTheBird = () => {
    this.showBirdInfo({
      imagePath: secretBird,
      birdName: SECRET_BIRD_NAME,
      birdLatinName: DEFAULT_LATIN_NAME,
    });
  };

  changeTheBird = (birdInfo) => {
    const {
      name,
      species,
      image,
      audio,
    } = birdInfo;
    this.hideTheBird();

    this.curBirdName = name;
    this.curBirdImagePath = image;
    this.curBirdLatinName = species;
    this.pauseSong();
    this.loadSong(audio);
  };

  initPlayer = () => {
    this.setElements();
    this.addEventListeners();
    this.hideTheBird();
  };
}
