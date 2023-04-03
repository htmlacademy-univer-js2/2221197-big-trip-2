import { render, RenderPosition } from './render';
import Filters from './view/filters';
import MenuView from './view/menu';
import Trip from './presenter/trip';

const menuContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresent = new Trip({container: tripContainer});
render(new Filters, filterContainer, RenderPosition.BEFOREEND);
render(new MenuView, menuContainer, RenderPosition.BEFOREEND);
tripPresent.init();
