import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';

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
      return doc.data().polar_user_id;
    });
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

export async function createSleep(sleepDate, sleepMin, id) {
  try {
    const sleepData = {
      date: sleepDate,
      sleepMin: sleepMin,
      userId: id,
    };
    const ref = await firestore()
      .collection('polar_sleep')
      .doc(sleepDate + '-' + id)
      .set(sleepData);
  } catch (error) {
    console.error(error);
  }
}
