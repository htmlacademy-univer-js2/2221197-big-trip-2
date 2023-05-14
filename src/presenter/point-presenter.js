import RoutePointView from '../view/route-point-view';
import EditFormView from '../view/edit-form-view';
import { remove, render, replace } from '../framework/render';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class PointPresenter {
  #pointComponent = null;
  #formEditComponent = null;
    #pointsList = null;
    #point = null;
    #destinations = null;
    #offers = null;
    #prevPointComponent = null;
    #prevFormEditComponent = null;
    #mode = Mode.DEFAULT;
    #changeData = null;
    #changeMode = null;

    constructor(pointsList, pointsModel, changeData, changeMode) {
      this.#pointsList = pointsList;
      this.#changeData = changeData;
      this.#changeMode = changeMode;
      this.#destinations = [...pointsModel.destinations];
      this.#offers = [...pointsModel.offers];
    }

    init(point) {
      this.#prevPointComponent = this.#pointComponent;
      this.#prevFormEditComponent = this.#formEditComponent;
      this.#point = point;
      this.#pointComponent = new RoutePointView(this.#point, this.#destinations, this.#offers);
      this.#formEditComponent = new EditFormView(this.#point, this.#destinations, this.#offers);
      this.#pointComponent.setFavouriteClickHandler(this.#handlefavouriteClick);
      this.#pointComponent.setEditClickHandler(this.#replacePointToEditForm);
      this.#formEditComponent.setPreviewClickHandler(this.#replaceEditFormToPoint);
      this.#formEditComponent.setSubmitClickHandler(this.#handleFormSubmit);

      if (this.#prevPointComponent === null || this.#prevFormEditComponent === null) {
        render(this.#pointComponent, this.#pointsList.element);
      } else {
        replace(this.#pointComponent, this.#prevPointComponent);
      }
    }

    #replaceEditFormToPoint = () => {
      replace(this.#pointComponent, this.#formEditComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#mode = Mode.DEFAULT;
    };

    resetViewToDefault = () => {
      if (this.#mode === Mode.EDITING) {
        this.#replaceEditFormToPoint();
      }
    }

    destroy = () => {
      remove(this.#pointComponent);
      remove(this.#formEditComponent);
    }

    #replaceEditFormToPoint = () => {
      replace(this.#pointComponent, this.#formEditComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#mode = Mode.DEFAULT;
    };

    #onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceEditFormToPoint();
      }
    }

    #handlefavouriteClick = () => {
      this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
    };

    #handleFormSubmit = (point) => {
      this.#changeData(point);
      this.#replaceEditFormToPoint();
    };
}
