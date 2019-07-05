const dateMap = date => [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
const timeBoundsMap = {
  month: {
    min:[1,1,0.1,0,0,0],
    max:[1,1.1,0.1,0,0,0]
  },
  day: {
    min:[1,1,1,0,0,0],
    max:[1,1,1.1,0,0,0]
  },
  year: {
    min:[1,0,0.1,0,0,0],
    max:[1.1,0,0.1,0,0,0]
  },
  awake: {
    min:[1,1,1,0.9,0,0],
    max:[1,1,1,0.18,0,0]
  }
};
const invisibleBound = ['awake'];
const dayBounds = {
  min: 6,
  max: 18
};

export const getTimeBounds = (type, date) => {
  const { min, max } = timeBoundsMap[type] || timeBoundsMap['day'];
  const dateMapData = dateMap(date);

  const [ minMap, maxMap ] = [ min, max ].map(it => (
    it.map((value, index) => {
      const valueDecimal = value.toString().split('.').length > 1 ? value.toString().split('.')[1].length : 0;
      const offset = (value - Math.floor(value) ) * Math.pow(10, valueDecimal);
      return Math.floor(value) * dateMapData[index] + offset;
    })
  ));

  return {
    min: Reflect.construct(Date, minMap),
    max: Reflect.construct(Date, maxMap)
  }
};

export const getTimeSpent = (currentTime, boundType = 'day') => {
  const timeBounds = getTimeBounds(boundType, currentTime);
  const timeSpent = Math.round((currentTime.getTime() - timeBounds.min) * 100 / (timeBounds.max - timeBounds.min));
  return timeSpent > 100 ? '\u221E' : timeSpent;
};

export const isNightTime = currentTime => {
  const currentHour = currentTime.getHours();
  const { min, max } = dayBounds;

  return currentHour <= min || currentHour >= max;
};

export const allBounds = Object.keys(timeBoundsMap).filter( it => !invisibleBound.includes(it));

export const allBoundsAwake = ['awake'];

export const setAwakeTimeBounds = ({ boundLimits }) => {
  const { awake } = timeBoundsMap;

  Object.keys(awake).forEach(key => {
    awake[key][3] = Number('0.' + Number(boundLimits[key].hour));
    awake[key][4] = Number('0.' + Number(boundLimits[key].minutes));
  });
};
