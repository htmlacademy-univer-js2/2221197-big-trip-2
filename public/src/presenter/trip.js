import {render, RenderPosition} from '../render';
import Sort from '../view/sort';
import ListPointView from '../view/list-point';
import PointView from '../view/point';
import EditPointView from '../view/edit-point';

export default class Trip {
  constructor({container}) {
    this.component = new ListPointView();
    this.container = container;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];
    render(new Sort(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new EditPointView(this.boardPoints[0], this.destinations, this.offers), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of this.boardPoints) {
      render (new PointView(point, this.destinations, this.offers), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}
