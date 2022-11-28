import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {getTimestamp} from 'react-native-reanimated/lib/reanimated2/core';

export async function fetchUserIdP(id) {
  try {
    var userIdP = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();
    if (userIdP.empty) {
      console.log('EI ole');
      return;
    }
    userIdP.forEach(doc => {
      result = doc.data().polar_user_id;
      console.log(doc.data().polar_user_id);

    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAccessTokenP(id) {
  try {
    var accessTokenP = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();

    if (accessTokenP.empty) {
      console.log('EI ole');
      return;
    }
    accessTokenP.forEach(doc => {
      result = doc.data().polar_access_token;
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSleepP(id) {
  try {
    const today = new Date();
    today.setDate(today.getDate() - 7);

    var response = await firestore()
      .collection('polar_sleep')
      .where('user_id','==', id)
      .where('date', '>=', today)
      .get(); 


     
    if (response.empty) {
      console.log('EI ole');
      return;
    }

    const sleepListP = []

    response.forEach(doc => {
      
      sleepListP.push(doc.data());
    });
    return sleepListP;

  } catch (error) {
    console.error(error);
  }
}

export async function fetchStepsP(id) {
    try {
      const today = new Date();
      today.setDate(today.getDate() - 7);
  
      var response = await firestore()
        .collection('polar_steps')
        .where('user_id','==', id)
        .where('date', '>=', today)
        .get(); 
  
  
       
      if (response.empty) {
        console.log('EI ole');
        return;
      }
  
      //const sleepListP = []
      var stepsData = [];
      response.forEach(doc => {
        stepsData.push(doc.data());
      });
      return stepsData;
      
  
    } catch (error) {
      console.error(error);
    }
  }
  
  
  export async function fetchCaloriesP(id) {
    try {
      const today = new Date();
      today.setDate(today.getDate() - 7);
  
      var calories = await firestore()
        .collection('polar_calories')
        .where('user_id','==', id)
        .where('date', '>=', today)
        .get(); 
  
  
       
      if (calories.empty) {
        console.log('EI ole');
        return;
      }
  
      const caloriesListP = [];
  
      calories.forEach(doc => {
        
        caloriesListP.push(doc.data());
      });
      return caloriesListP;
  
    } catch (error) {
      console.error(error);
    }
  }
  
 

export async function createSleep(sleepDate, sleepMin, id) {
  try {
       
    const sleepData = {
      date:  new Date(sleepDate),
      sleep_min: sleepMin,
      user_id: id,
    };
    const ref = await firestore()
      .collection('polar_sleep')
      .doc(sleepDate + '-' + id)
      .set(sleepData);
  } catch (error) {
    console.error(error);
  }
}

export async function createSteps(stepsDate, steps, id) {
  try {
    const stepData = {
      date: new Date(stepsDate),
      steps: steps,
      user_id: id,
    };
    const ref = await firestore()
      .collection('polar_steps')
      .doc(stepsDate + '-' + id)
      .set(stepData);
  } catch (error) {
    console.error(error);
  }
}
export async function createCalories(caloriesDate, calories, id) {
  try {
    const caloriesData = {
      date: new Date(caloriesDate),
      calories: calories,
      user_id: id,
    };
    const ref = await firestore()
      .collection('polar_calories')
      .doc(caloriesDate + '-' + id)
      .set(caloriesData);
  } catch (error) {
    console.error(error);
  }
}
