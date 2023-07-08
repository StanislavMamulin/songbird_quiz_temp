import { htmlToElement } from '../../utils/htmlToElement';
import './styles.css';
import categoryItem from './index.html';

export const CategoryItem = ({ title }) => {
  const itemElement = htmlToElement(categoryItem);
  const titleElement = itemElement.querySelector('.question-categories__item__title');
  titleElement.innerHTML = title;

  return itemElement;
};

export const activateCategory = (categoryElement) => {
  categoryElement.classList.add('question-categories__item_active');
};

export const disableCategory = (categoryElement) => {
  categoryElement.classList.remove('question-categories__item_active');
};
