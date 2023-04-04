import { render, RenderPosition } from './render';
import Filters from './view/filters';
import MenuView from './view/menu';
import Trip from './presenter/trip';
import PointsModel from './model/trip-points-model';
import { getPoints, getDestinations, getOffers } from './mock/point';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresent = new Trip(tripContainer);
const points = getPoints();
const offersByType = getOffers();
const destinations = getDestinations();
const pointsModel = PointsModel();

render(new Filters, filterContainer, RenderPosition.BEFOREEND);
render(new MenuView, menuContainer, RenderPosition.BEFOREEND);
pointsModel.init(points, destinations, offersByType);
tripPresent.init(pointsModel);
