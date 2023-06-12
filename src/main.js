import FilterPresenter from './presenter/filter-presenter';
import TripEventsPresenter from './presenter/trip-events-presenter';
import NewPointButtonPresenter from './presenter/new-point-button-presenter';
import FilterModel from './model/filter-model';
import PointsModel from './model/trip-points-model';
import SiteMenuView from './view/site-menu-view';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import DestinationsApiService from './api-service/destinations-api';
import OffersApiService from './api-service/offers-api';
import PointsApiService from './api-service/points-api';
import { render } from './framework/render';

const AUTHORIZATION = 'Basic 8nxo4bi4hwx2686k';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

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

const tripPresenter = new TripEventsPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
tripPresenter.init();

const newPointButtonPresenter = new NewPointButtonPresenter({
  newPointButtonContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  tripPresenter: tripPresenter
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
