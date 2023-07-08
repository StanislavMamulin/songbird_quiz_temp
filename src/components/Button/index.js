import './styles.css';

export class Button {
  constructor() {
    this.isActive = false;
  }

  makeActive = () => {
    this.isActive = true;
    this.buttonElement.classList.remove('button_disabled');
  };

  disableButton = () => {
    this.isActive = false;
    this.buttonElement.classList.add('button_disabled');
  };

  setElement = (elementClass) => {
    this.buttonElement = document.querySelector(elementClass);
  };

  setOnclickHandler = (handler) => { this.buttonElement.addEventListener('click', handler); };
}
