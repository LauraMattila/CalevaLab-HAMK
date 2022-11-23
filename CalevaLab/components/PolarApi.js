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
export async function listActivity(id) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const transactionId = await postSomething(id);
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions/' +
        transactionId,
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

export async function putSomething(id) {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const activityLink = await listActivity(id);

    const response = await fetch(activityLink, {
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
    const activityLink = await listActivity(id);

    const activitySummary = [];

    for (const link of activityLink){
        const jsonObj = await activity(link, accessTokenP, id);
        
        activitySummary.push(jsonObj);
        
    }
    console.log(activitySummary.date);
    //console.log(activitySummary.date);
  } catch (error) {
    console.log(error);
  }
}

export async function activity(link, accessToken, id) {
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

    const steps = json['active-steps'];
    const date = json.date;
    const calories = json.calories;

    var obj = new Object();
    obj.date = date;
    obj.steps = steps;
    obj.calories = calories;
    var jsonString = JSON.stringify(obj);

    //console.log('Json Objekti '+ jsonString);
    //console.log(json);
    return jsonString;
  } catch (error) {
    console.log(error);
  }
}
