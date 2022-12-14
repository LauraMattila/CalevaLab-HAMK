import React, {useState, useEffect} from 'react';
import {
  fetchStepsWeeklyF,
  fetchSleepWeeklyF,
  fetchCaloriesWeeklyF,
  fetchSleepMonthlyF,
  fetchCaloriesMonthlyF,
  fetchStepsMonthlyF,
} from './FitbitDb';
import {
  fetchStepsWeeklyP,
  fetchSleepWeeklyP,
  fetchCaloriesWeeklyP,
  fetchSleepMonthlyP,
  fetchCaloriesMonthlyP,
  fetchStepsMonthlyP,
} from './PolarDb';
import {
  fetchStepPreference,
  fetchSleepPreference,
  fetchCaloriesPreference,
} from './UserDb';

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
};

var getDateArray = function (startdate, today) {
  var arr = new Array(),
    dt = new Date(startdate);

  while (dt <= today) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
};
var getWeekStepList = async (userId, queryDate) => {
  var today = new Date();
  var data = [];
  var date = queryDate;
  date.setDate(queryDate.getDate() + 1);
  const dateArray = getDateArray(date, today);
  const preference = await fetchStepPreference(userId);
  if (preference == 'Polar') {
    data = await fetchStepsWeeklyP(userId, queryDate);
  }
  if (preference == 'Fitbit') {
    data = await fetchStepsWeeklyF(userId, queryDate);
  }

  var dateIndex = 0;
  var dbIndex = 0;
  var weeklySteps = 0;
  var currentDate;
  var dbDate;
  var weeklyStepsList = [];
  var currentDateObj;
  let daysWithData = 0;
  for (let y = 0; y < 7; y++) {
    weeklySteps = 0;
    daysWithData = 0;
    for (let i = 0; i < 7; i++) {
      if (dateArray[dateIndex] != undefined) {
        currentDateObj = dateArray[dateIndex];
        currentDate = currentDateObj.toISOString().slice(0, 10);
      } else {
        break;
      }
      if (data[dbIndex] != undefined) {
        dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
      }
      if (currentDate == dbDate) {
        weeklySteps += data[dbIndex].steps;
        dbIndex++;
        daysWithData++;
      }
      dateIndex++;
    }

    weeklyStepsList.push({steps: weeklySteps, days: daysWithData});
  }
  return weeklyStepsList;
};
var getWeekSleepList = async (userId, queryDate) => {
  var today = new Date();
  var data = [];
  var date = queryDate;
  date.setDate(queryDate.getDate() + 1);
  const dateArray = getDateArray(date, today);
  const preference = await fetchSleepPreference(userId);
  if (preference == 'Polar') {
    data = await fetchSleepWeeklyP(userId, queryDate);
  }
  if (preference == 'Fitbit') {
    data = await fetchSleepWeeklyF(userId, queryDate);
  }

  var dateIndex = 0;
  var dbIndex = 0;
  var weeklySleep = 0;
  var currentDate;
  var dbDate;
  var weeklySleepList = [];
  var currentDateObj;
  let daysWithData = 0;
  for (let y = 0; y < 7; y++) {
    weeklySleep = 0;
    daysWithData = 0;
    for (let i = 0; i < 7; i++) {
      if (dateArray[dateIndex] != undefined) {
        currentDateObj = dateArray[dateIndex];
        currentDate = currentDateObj.toISOString().slice(0, 10);
      } else {
        break;
      }
      if (data[dbIndex] != undefined) {
        dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
      }
      if (currentDate == dbDate) {
        weeklySleep += data[dbIndex].sleep_min;
        dbIndex++;
        daysWithData++;
      }
      dateIndex++;
    }

    weeklySleepList.push({sleep: weeklySleep, days: daysWithData});
  }
  return weeklySleepList;
};
var getWeekCaloriesList = async (userId, queryDate) => {
  var today = new Date();
  var data = [];
  var date = queryDate;
  date.setDate(queryDate.getDate() + 1);
  const dateArray = getDateArray(date, today);
  const preference = await fetchCaloriesPreference(userId);
  if (preference == 'Polar') {
    data = await fetchCaloriesWeeklyP(userId, queryDate);
  }
  if (preference == 'Fitbit') {
    data = await fetchCaloriesWeeklyF(userId, queryDate);
  }

  var dateIndex = 0;
  var dbIndex = 0;
  var weeklyCalories = 0;
  var currentDate;
  var dbDate;
  var weeklyCaloriesList = [];
  var currentDateObj;
  let daysWithData = 0;
  for (let y = 0; y < 7; y++) {
    weeklyCalories = 0;
    daysWithData = 0;
    for (let i = 0; i < 7; i++) {
      if (dateArray[dateIndex] != undefined) {
        currentDateObj = dateArray[dateIndex];
        currentDate = currentDateObj.toISOString().slice(0, 10);
      } else {
        break;
      }
      if (data[dbIndex] != undefined) {
        dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
      }
      if (currentDate == dbDate) {
        weeklyCalories += data[dbIndex].calories;
        dbIndex++;
        daysWithData++;
      }
      dateIndex++;
    }

    weeklyCaloriesList.push({calories: weeklyCalories, days: daysWithData});
  }
  return weeklyCaloriesList;
};

export const fetchWeeklySteps = async userId => {
  var today = new Date();
  var weekday = today.getDay();
  var queryDate = new Date();
  var weeklyStepList = [];
  let index;
  let stepsWeekList = [];
  switch (weekday) {
    case 0:
      queryDate.setDate(today.getDate() - 49);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
    case 1:
      queryDate.setDate(today.getDate() - 43);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
    case 2:
      queryDate.setDate(today.getDate() - 44);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
    case 3:
      queryDate.setDate(today.getDate() - 45);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
    case 4:
      queryDate.setDate(today.getDate() - 46);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
    case 5:
      queryDate.setDate(today.getDate() - 47);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;

    case 6:
      queryDate.setDate(today.getDate() - 48);
      weeklyStepList = await getWeekStepList(userId, queryDate);

      index = 0;
      weeklyStepList.forEach(week => {
        if (week.days != 0) {
          stepsWeekList[index] = Math.round(week.steps / week.days);
        } else {
          stepsWeekList[index] = 'NA';
        }
        index++;
      });
      return stepsWeekList;
  }
};
export const fetchWeeklySleep = async userId => {
  var today = new Date();
  var weekday = today.getDay();
  var queryDate = new Date();
  var weeklySleepList = [];
  let index;
  let sleepWeekList = [];
  let totalMinutes;
  let hours;
  let minutes;
  switch (weekday) {
    case 0:
      queryDate.setDate(today.getDate() - 49);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      console.log(weeklySleepList);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
    case 1:
      queryDate.setDate(today.getDate() - 43);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      console.log(weeklySleepList);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
    case 2:
      queryDate.setDate(today.getDate() - 44);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
    case 3:
      queryDate.setDate(today.getDate() - 45);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
    case 4:
      queryDate.setDate(today.getDate() - 46);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
    case 5:
      queryDate.setDate(today.getDate() - 47);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;

    case 6:
      queryDate.setDate(today.getDate() - 48);
      weeklySleepList = await getWeekSleepList(userId, queryDate);
      index = 0;
      weeklySleepList.forEach(week => {
        totalMinutes = week.sleep / week.days;
        hours = Math.floor(totalMinutes / 60);
        minutes = Math.floor(totalMinutes % 60);
        if (week.days != 0) {
          sleepWeekList[index] = hours + 'h ' + minutes + 'm';
        } else {
          sleepWeekList[index] = 'NA';
        }
        index++;
      });
      return sleepWeekList;
  }
};
export const fetchWeeklyCalories = async userId => {
  var today = new Date();
  var weekday = today.getDay();
  var queryDate = new Date();
  var weeklyCaloriesList = [];
  let index;
  let caloriesWeekList = [];
  switch (weekday) {
    case 0:
      queryDate.setDate(today.getDate() - 49);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
    case 1:
      queryDate.setDate(today.getDate() - 43);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
    case 2:
      queryDate.setDate(today.getDate() - 44);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
    case 3:
      queryDate.setDate(today.getDate() - 45);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
    case 4:
      queryDate.setDate(today.getDate() - 46);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
    case 5:
      queryDate.setDate(today.getDate() - 47);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;

    case 6:
      queryDate.setDate(today.getDate() - 48);
      weeklyCaloriesList = await getWeekCaloriesList(userId, queryDate);
      index = 0;
      weeklyCaloriesList.forEach(week => {
        if (week.days != 0) {
          caloriesWeekList[index] = Math.round(week.calories / week.days);
        } else {
          caloriesWeekList[index] = 'NA';
        }
        index++;
      });
      return caloriesWeekList;
  }
};

export const fetchMonthlySleep = async userId => {
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  const data = [];
  const preference = await fetchSleepPreference(userId);
  for (let i = 0; i < 7; i++) {
    if (preference == 'Polar') {
      data[i] = await fetchSleepMonthlyP(month, year, userId);
    }
    if (preference == 'Fitbit') {
      data[i] = await fetchSleepMonthlyF(month, year, userId);
    }
    switch (month) {
      case 0:
        month = 11;
        year--;
        break;
      default:
        month--;
        break;
    }
  }
  return data;
};

export const fetchMonthlySteps = async userId => {
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  const data = [];
  const preference = await fetchStepPreference(userId);
  for (let i = 0; i < 7; i++) {
    if (preference == 'Polar') {
      data.push(await fetchStepsMonthlyP(month, year, userId));
    }
    if (preference == 'Fitbit') {
      data.push(await fetchStepsMonthlyF(month, year, userId));
    }
    switch (month) {
      case 0:
        month = 11;
        year--;
        break;
      default:
        month--;
        break;
    }
  }
  return data;
};

export const fetchMonthlyCalories = async userId => {
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  const data = [];
  const preference = await fetchCaloriesPreference(userId);
  for (let i = 0; i < 7; i++) {
    if (preference == 'Polar') {
      data.push(await fetchCaloriesMonthlyP(month, year, userId));
    }
    if (preference == 'Fitbit') {
      data.push(await fetchCaloriesMonthlyF(month, year, userId));
    }
    switch (month) {
      case 0:
        month = 11;
        year--;
        break;
      default:
        month--;
        break;
    }
  }
  return data;
};
