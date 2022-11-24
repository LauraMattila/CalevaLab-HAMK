import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {
  fetchUserIdP,
  fetchAccessTokenP,
  createSleep,
  createSteps,
  createCalories,
} from '../db/PolarDb';

export async function getSleep(id) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/sleep/available',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );
    const json = await response.json();

    //JSON.parse(JSON.stringify(json))

    json.available.forEach(item => {
      var date1 = new Date(item.start_time);
      var date2 = new Date(item.end_time);

      const sleepMin = (Math.abs(date1 - date2) / 36e5) * 60;
      const sleepDate = item.date;
      console.log(sleepDate);
      console.log(sleepMin);

      createSleep(sleepDate, sleepMin, id);
    });
  } catch (error) {
    console.log(error);
  }
}

//Posts the transaction id
export async function postSomething(id) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );

    const json = await response.json();

    console.log(json['transaction-id']);
    transactionId = json['transaction-id'];

    return transactionId;
  } catch (error) {
    console.log(error);
  }
}

//Puts all the links of activity into a list
export async function listActivity(id, transaction) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions/' +
        transaction,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',

          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );

    const json = await response.json();

    const activityLinkList = [];
    json['activity-log'].forEach(item => {
      activityLinkList.push(item);
    });
    return activityLinkList;
  } catch (error) {
    console.log(error);
  }
}

export async function putSomething(id, transaction) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    

    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions/' +
        transaction,
      {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + accessTokenP,
      },
    });

    const json = await response.json();
  } catch (error) {
    console.log(error);
  }
}

//needs listActivity() to work
export async function getActivity(id) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    //loop start
    while(true) {
    const transactionId = await postSomething(id);
    console.log("Transaction ID: " + transactionId);
    if (transactionId == undefined) {
        console.log("No new data available")
        return;
    }
    const activityLink = await listActivity(id, transactionId);
    
    const activitySummary = [];
    console.log(activityLink);
    for (const link of activityLink) {
      const jsonObj = await activity(link, accessTokenP);

      activitySummary.push(jsonObj);
    }

    activitySummary.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    var index = 0;

    activitySummary.forEach(item => {
      var date = item.date;
      var calories = item.calories;
      var steps = item['active-steps'];
      index += 1;

      if (activitySummary[index]!== undefined) {
        console.log('hevosenseiväs ')
      if (date == activitySummary[index].date) {
        console.log('kahen kilon siika ')
        return;
      }
    }
      console.log(item);
      createSteps(date, steps, id);
      createCalories(date, calories, id);
    });
    putSomething(id, transactionId);
  }
    //loop end
    console.log(activitySummary);
  } catch (error) {
    console.log(error);
  }
}

export async function activity(link, accessToken) {
  try {
    const accessTokenP = accessToken;
    const response = await fetch(link, {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        Authorization: 'Bearer ' + accessTokenP,
      },
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log(error);
  }
}
