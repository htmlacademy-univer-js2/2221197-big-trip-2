import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';

const pointDueDate = (date) => dayjs(date).format('DD MM');

const duration = (dateForm, dateTo) => {
  const start = dayjs(dateForm);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');
  const days = Math.floor(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.floor((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT;
  const daysOutput = (days) ? `${days}D` : '';
  const hoursOutput = (restHours) ? `${restHours}H` : '';
  const minutesOutput = (restMinutes) ? `${restMinutes}M` : '';

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getDate = (date) => dayjs(date).format(DATE_FORMAT);
const getTime = (date) => dayjs(date).format(TIME_FORMAT);
const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.ceil(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * @param {number[]} elements
 * @returns {number[]}
 */
const getRandomElement = (elements) => {
  const max = elements.length - 1;
  return elements[getRandomInteger(0, max)];
};

export {getRandomInteger, getRandomElement, pointDueDate, duration, getDate, getDateTime, getTime};
