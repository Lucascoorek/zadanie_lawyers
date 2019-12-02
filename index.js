const input = `6 3 3 8 4 12 2 6 1 10 5 9 11 12`;

const createDataObj = data => {
  resultsObj = {};
  const arr = data.split(" ");
  let lastHour = 0;
  const intArr = [];
  for (let i of arr) {
    if (parseInt(i) > lastHour) {
      lastHour = parseInt(i);
    }
    intArr.push(parseInt(i));
  }

  resultsObj.n = intArr.shift();
  resultsObj.k = intArr.shift();
  resultsObj.lastHour = lastHour;
  resultsObj.arr = [];
  while (intArr.length) {
    const begin = intArr.shift();
    const end = intArr.shift();
    resultsObj.arr.push([]);
    for (let i = 1; i <= lastHour - 1; i++) {
      if (begin > i) {
        resultsObj.arr[resultsObj.arr.length - 1].push(null);
      } else if (i < end && end <= lastHour) {
        resultsObj.arr[resultsObj.arr.length - 1].push(i);
      } else {
        resultsObj.arr[resultsObj.arr.length - 1].push(null);
      }
    }
  }
  return resultsObj;
};

const maxDuration = data => {
  const { n, k, arr, lastHour } = createDataObj(data);
  const memo = [];
  const hoursObj = {};
  for (let hour = 0; hour < lastHour - 1; hour++) {
    for (let lawyer = 0; lawyer <= n - 1; lawyer++) {
      if (arr[lawyer][hour]) {
        hoursObj[arr[lawyer][hour]] = hoursObj[arr[lawyer][hour]] || [];
        hoursObj[arr[lawyer][hour]].push(lawyer + 1);
      }
    }
  }

  for (let hour in hoursObj) {
    if (hoursObj[hour].length < k) {
      delete hoursObj[hour];
    }
  }
  console.log(hoursObj);

  const lawyerObj = {};
  for (let hour in hoursObj) {
    for (let lawyer of hoursObj[hour])
      lawyerObj[lawyer] = (lawyerObj[lawyer] || 0) + 1;
  }
  const lawyerArr = Object.entries(lawyerObj);
  console.log(lawyerArr);
};

maxDuration(input);
