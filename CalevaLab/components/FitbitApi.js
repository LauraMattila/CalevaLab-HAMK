import React, {useState, useEffect} from 'react';
import {
  fetchUserId,
  fetchAccessToken,
  fetchStepsLog,
  saveSleepLog,
  SaveStepsLog,
} from '../db/FitbitDb';

export async function getSleepDataFit(id) {
  try {
    var user_id = await fetchUserId(id);
    console.log(user_id);
    //const date = new Date().toISOString().slice(0, 10);
    const date = new Date('2022-11-10').toISOString().slice(0, 10);
    console.log(date);
    const URL =
      'https://api.fitbit.com/1.2/user/' +
      user_id +
      '/sleep/list.json?afterDate=' +
      date +
      '&sort=asc&offset=0&limit=28';
    const accessToken = await fetchAccessToken(id);
    console.log(accessToken);
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + accessToken,
        accept: 'application/json',
      },
    });

    const json = await response.json();
    //console.log(json);
    //console.log('Sleep (minutes) = ' + json.sleep[0].minutesAsleep);
    //console.log('Date = ' + json.sleep[1].dateOfSleep);
    let index = 0;
    var userSleep = 0;
    var sleepDate;
    json.sleep.forEach(sleep => {
      userSleep += sleep.minutesAsleep;
      sleepDate = sleep.dateOfSleep;
      index += 1;
      try {
        if (json.sleep[index] !== undefined) {
          if (sleepDate == json.sleep[index].dateOfSleep) {
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
      //console.log("sleepDate     " +sleepDate);
      //console.log("userSleep     "+userSleep);
      saveSleepLog(sleepDate, userSleep, id);
      userSleep = 0;
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getStepsFit(id) {
  try {
    var user_id = await fetchUserId(id);
    const enddate = new Date();
    let day = enddate.getDate();
    let month = enddate.getMonth() + 1;
    let year = enddate.getFullYear();
    console.log(enddate)
    const startdate = new Date();
    startdate.setDate(enddate.getDate() - 5);

    const URL =
      'https://api.fitbit.com/1.2/user/' +
      user_id +
      '/activities/steps/date/' +
      startdate.toISOString().split('T')[0] +
      '/' +
      enddate.toISOString().split('T')[0] +
      '.json';
    const accessToken = await fetchAccessToken(id);

    console.log(startdate);
    console.log('URL = ' + URL);
    console.log('USER ID = ' + user_id);
    console.log('ACCESSTOKEN = ' + accessToken);
    console.log('');

    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + accessToken,
        accept: 'application/json',
      },
    });
    const json = await response.json();
    console.log(response);
    
    json['activities-steps'].forEach(item => {
      const string = item.dateTime;
      const stepsDate =new Date(string);
      const steps = item.value;
      SaveStepsLog(stepsDate, steps, id, string);
    });


  } catch (error) {
    console.error(error);
  }
}

export const getCalsFit = async () => {
  try {
    const response = await fetch(
      'https://api.fitbit.com/1.2/user/B8HWHQ/activities/date/2022-11-18.json',
      {
        method: 'GET',
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhUWDciLCJzdWIiOiJCOEhXSFEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3c2xlIHdhY3QiLCJleHAiOjE3MDAxMzA4NzksImlhdCI6MTY2ODc2MjM1OX0._RBCDMv1gvOW8SIVHWfXierFREvyy2S_PYwA44jefJg',
          accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    console.log('Calories = ' + json.summary.calories['total']);
    setCalories(json.summary.calories['total']);
  } catch (error) {
    console.error(error);
  }
};
