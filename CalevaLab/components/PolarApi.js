import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {fetchUserIdP, fetchAccessTokenP, createSleep} from '../db/PolarDb';

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

export async function postSomething() {
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

export async function putSomething() {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const transactionId = await postSomething();
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions/' +
        transactionId,
      {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );

    const json = await response.json();

    console.log();
  } catch (error) {
    console.log(error);
  }
}


//Does not work yet!
export async function listActivity() {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const transactionId = await postSomething();
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/'+userId+'/activity-transactions/'+transactionId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',

          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );

    const json = await response.json();

    //const activityId = json[]

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}



//needs listActivity() to work
export async function getActivity() {
  try {
    const accessTokenP = await fetchAccessTokenP(id);
    const userId = await fetchUserIdP(id);
    const transactionId = await postSomething();
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/users/' +
        userId +
        '/activity-transactions/'+transactionId+'/activities/1714765106',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',

          Authorization: 'Bearer ' + accessTokenP,
        },
      },
    );

    const json = await response.json();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
