import {createElement} from '../render';

const createPointsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`);

export default class ListPointView {
  getTemplate() {
    return createPointsListTemplate();
  }

  getElement() {
    this.element = this.element || createElement(this.getTemplate());
    return this.element;
  }

  removeEleemnt() {
    this.element = null;
  }
}
