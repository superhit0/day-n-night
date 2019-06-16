const dateMap = date => [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
const timeBoundsMap = {
  day: {
    min:[1,1,1,0,0,0],
    max:[1,1,2,0,0,0]
  },
  month: {
    min:[1,1,0,0,0,0],
    max:[1,2,0,0,0,0]
  },
  year: {
    min:[1,0,0,0,0,0],
    max:[2,0,0,0,0,0]
  }
};

const getTimeBounds = (type, date) => {
  const { min, max } = timeBoundsMap[type] || timeBoundsMap['day'];
  const dateMapData = dateMap(date);

  const [ minMap, maxMap ] = [ min, max ].map(it => (
    it.map((value, index) => {
      let offset = 0;
      if (value > 1) {
        offset = 1;
        value = 1;
      }
      return value * dateMapData[index] + offset;
    })
  ));

  return {
    min: Reflect.construct(Date, minMap),
    max: Reflect.construct(Date, maxMap)
  }
};

export const getTimeSpent = (currentTime) => {
  const timeBounds = getTimeBounds('day', currentTime);
  const timeSpent = Math.round((currentTime.getTime() - timeBounds.min) * 100 / (timeBounds.max - timeBounds.min));
  return timeSpent > 100 ? '\u221E' : timeSpent;
};
