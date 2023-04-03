import {render, RenderPosition} from '../render';
import Sort from '../view/sort';
import ListPointView from '../view/list-point';
import PointView from '../view/point';
import NewPointView from '../view/new-point';
import EditPointView from '../view/edit-point';

export default class Trip {
  constructor({container}) {
    this.component = new ListPointView();
    this.container = container;
  }

  init() {
    render(new Sort, this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new NewPointView, this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditPointView, this.component.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render (PointView, this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
