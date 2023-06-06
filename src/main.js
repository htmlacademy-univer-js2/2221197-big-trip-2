import { render } from './framework/render';
import FilterPresenter from './presenter/filter-presenter';
import BoardPresenter from './presenter/board-presenter';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';
import SiteMenuView from './view/site-menu-view';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import PointsApiService from './api-service/points-api-service';
import DestinationsApiService from './api-service/destinations-api-service';
import OffersApiService from './api-service/offers-api-service';
import { END_POINT, AUTHORIZATION } from './const';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filterModel: filterModel
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
boardPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  boardPresenter: boardPresenter
});
newPointButtonPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newPointButtonPresenter.renderNewPointButton();
    });
  });
});

render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
