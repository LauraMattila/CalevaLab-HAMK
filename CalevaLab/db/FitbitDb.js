import firestore, {firebase} from '@react-native-firebase/firestore';
import {string} from 'prop-types';

export async function fetchUserId(id) {
  try {
    console.log('KÄYTTÄJÄ: ' + id);
    var userId = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();
    if (userId.empty) {
      console.log('EI OLE USERID');
      return;
    }
    userId.forEach(doc => {
      result = doc.data().fitbit_user_id;
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAccessToken(id) {
  try {
    var accessToken = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();

    if (accessToken.empty) {
      console.log('EI OLE TOKEN');
      return;
    }
    accessToken.forEach(doc => {
      result = doc.data().fitbit_access_token;
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function saveSleepLog(sleepDate, sleepMin, id) {
  try {
    const sleepData = {
      date: new Date(sleepDate),
      sleep_min: sleepMin,
      user_id: id,
    };
    const res = await firestore()
      .collection('fitbit_sleep')
      .doc(sleepDate + '-' + id)
      .set(sleepData);
    console.log('SLEEP SAVED');
  } catch (error) {
    console.error(error);
  }
}

export async function SaveStepsLog(stepsDate, steps, id, string) {
  try {
    const stepsData = {
      date: stepsDate,
      steps: steps,
      user_id: id,
    };
    const res = await firestore()
      .collection('fitbit_steps')
      .doc(string + '-' + id)
      .set(stepsData);

    console.log('STEPS SAVED');
  } catch (error) {
    console.error(error);
  }
}

export async function SaveCaloriesLog(caloriesDate, calories, string, id) {
  try {
    const caloriesData = {
      date: caloriesDate,
      calories: calories,
      user_id: id,
    };
    const res = await firestore()
      .collection('fitbit_calories')
      .doc(string + '-' + id)
      .set(caloriesData);
    console.log('CAL SAVED');
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCaloriesLog(id) {
  const today = new Date();
  const startdate = new Date();
  startdate.setDate(today.getDate() - 7);

  try {
    var response = await firestore()
      .collection('fitbit_calories')
      .where('user_id', '==', id)
      .where('date', '>=', startdate)
      .get();

    if (response.empty) {
      console.log('EI OLE CALORIES');
      return;
    } else {
      caloriesDatafit = [];
      response.forEach(doc => {
        caloriesDatafit.push(doc.data());
      });
      return caloriesDatafit;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSleepLog(id) {
  const today = new Date();
  const startdate = new Date();
  startdate.setDate(today.getDate() - 7);
  try {
    var response = await firestore()
      .collection('fitbit_sleep')
      .where('user_id', '==', id)
      .where('date', '>=', startdate)
      .get();

    response.forEach(doc => {
      console.log(doc.data().date.toDate());
    });

    if (!response.exists) {
      console.log('EI OLE SLEEP');
      return;
    } else {
      console.log(response.data());
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchStepsLog(id) {
  const today = new Date();
  const startdate = new Date();
  //var dateFormat = require('dateformat');
  //dateFormat(today, "yyyy, mm, dddd");
  startdate.setDate(today.getDate() - 7);

  try {
    var response = await firestore()
      .collection('fitbit_steps')
      .where('user_id', '==', id)
      .where('date', '>=', startdate)
      .get();

    if (response.empty) {
      console.log('EI OLE STEPS');
      return;
    } else {
      stepsData = [];
      response.forEach(doc => {
        stepsData.push(doc.data());
      });
      return stepsData;
    }
  } catch (error) {
    console.error(error);
  }
}
