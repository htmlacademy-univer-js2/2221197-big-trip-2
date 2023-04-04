import {getRandomElement, getRandomInteger} from '../util';
import dayjs from 'dayjs';

const COUNT_OF_POINTS = 20;
const POINTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeeing', 'restaurant'];
const DESTINATION_NAMES = ['London', 'Moscow', 'Dubai', 'Bangkok', 'Paris'];
const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const elementCounter = {MIN: 1, MAX: 4};
const price = {MIN: 100, MAX: 1000};
const possibleNumberID = {MIN: 0, MAX: 10};

/**
 * @returns {string}
 */
const generateDescription = () => {
  let descriptions = '';
  for (let i = 0; i < getRandomInteger(elementCounter.MIN, elementCounter.MAX); i++) {
    descriptions += `${getRandomElement(DESCRIPTIONS)}`;
  }

  return descriptions;
};

const generatePicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(possibleNumberID.MIN, possibleNumberID.MAX)}`,
  description: generateDescription()
});

const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: DESTINATION_NAMES[id],
  pictures: Array.from({length: getRandomInteger(elementCounter.MIN, elementCounter.MAX)}, generatePicture)
});

const getDestinations = () => Array.from({length: DESTINATION_NAMES.length}).map((value, index) => generateDestination(index));
const generateOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`,
  price: getRandomInteger(price.MIN, price.MAX)
});

const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInteger(elementCounter.MIN, elementCounter.MAX)}).map((value, index) => generateOffer(index + 1, pointType))
});

const getOffers = () => Array.from({length: POINTS_TYPES.length}).map((value, index) => generateOffersByType(POINTS_TYPES[index]));

const offersByType = getOffers();
const destinations = getDestinations();

const generatePoint = (id) => {
  const offersByTypePoint = getRandomElement(offersByType);
  const allOfferIDByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);

  return {basePrice: getRandomInteger(-3, 0),
    dateFrom: dayjs().add(getRandomInteger(-2, 0), 'day').add(getRandomInteger(-2, 0), 'hour').add(getRandomInteger(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomInteger(0, 2), 'hour').add(getRandomInteger(0, 59), 'minute'),
    destinationID: getRandomElement(destinations).id,
    id,
    isFavorite: Boolean(getRandomInteger()),
    offerID: Array.from({length: getRandomInteger(0, allOfferIDByTypePoint.length)}).map(() => allOfferIDByTypePoint[getRandomInteger(0, allOfferIDByTypePoint.length - 1)]),
    type: offersByTypePoint.type
  };
};

const getPoints = () => Array.from({length: COUNT_OF_POINTS}).map((value, index) => generatePoint(index + 1));

export {getPoints, getDestinations, getOffers};
