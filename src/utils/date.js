const TODAY = new Date().toJSON().slice(0,10).split('-').reverse().join('/');

const parseDate = date => {
  var mdy = date.split('/');
  return new Date(mdy[2], mdy[1], mdy[0]-1);
};

export const isNotOver = end => {
  if (parseDate(end) > parseDate(TODAY)) {
    return true;
  } return false;
};
export const isStarted = start => {
  if (parseDate(start) <= parseDate(TODAY)) {
    return true;
  } return false;
};

export const renderRemainingDays = end => {
  var now = '03/05/2017';
  var oneDay = 1000*60*60*24;
  var remainingDays = Math.round((parseDate(end) - parseDate(now)) / oneDay);

  if (remainingDays <= 0) {
    return 'Défi terminé';
  } else if (remainingDays === 1) {
    return '1 jour restant';
  }
  return `${remainingDays} jours restants`;
};
