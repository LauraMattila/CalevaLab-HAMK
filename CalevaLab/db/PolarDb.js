import React, {useState, useEffect} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {getTimestamp} from 'react-native-reanimated/lib/reanimated2/core';

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
      var caloriesData = [];
      response.forEach(doc => {
        caloriesData.push(doc.data());
      });
      return caloriesData;
      
  
    } catch (error) {
      console.error(error);
    }
  }
  export async function fetchStepsWeeklyP(id, date) {
    try {
  
      var response = await firestore()
        .collection('polar_steps')
        .where('user_id','==', id)
        .where('date', '>=', date)
        .get(); 
  
  
       
      if (response.empty) {
        console.log('EI ole');
        return;
      }
  
      var caloriesData = [];
      response.forEach(doc => {
        caloriesData.push(doc.data());
      });
      return caloriesData;
      
  
    } catch (error) {
      console.error(error);
    }
  }
  export async function fetchSleepWeeklyP(id, date) {
    try {
  
      var response = await firestore()
        .collection('polar_sleep')
        .where('user_id','==', id)
        .where('date', '>=', date)
        .get(); 
  
  
       
      if (response.empty) {
        console.log('EI ole');
        return;
      }
  
      var sleepData = [];
      response.forEach(doc => {
        sleepData.push(doc.data());
      });
      return sleepData;
      
  
    } catch (error) {
      console.error(error);
    }
  }
  export async function fetchCaloriesWeeklyP(id, date) {
    try {
  
      var response = await firestore()
        .collection('polar_calories')
        .where('user_id','==', id)
        .where('date', '>=', date)
        .get(); 
  
  
       
      if (response.empty) {
        console.log('EI ole');
        return;
      }
  
      var caloriesData = [];
      response.forEach(doc => {
        caloriesData.push(doc.data());
      });
      return caloriesData;
      
  
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
      month: new Date(sleepDate).getMonth(),
      year: new Date(sleepDate).getFullYear(),
      week: new Date(sleepDate).getWeek()
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
      month: new Date(stepsDate).getMonth(),
      year: new Date(stepsDate).getFullYear(),
      week: new Date(stepsDate).getWeek()
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
      month: new Date(caloriesDate).getMonth(),
      year: new Date(caloriesDate).getFullYear(),
      week: new Date(caloriesDate).getWeek()
    };
    const ref = await firestore()
      .collection('polar_calories')
      .doc(caloriesDate + '-' + id)
      .set(caloriesData);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSleepMonthlyP (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('polar_sleep')
      .where('user_id','==', id)
      .where('month', '==', month)
      .where('year', '==', year)
      .get(); 

    if (response.empty) {
      console.log('EI ole');
      return "NA";
    }

    var sleepData= 0;
    var dataCount= 0;
    response.forEach(doc => {
      sleepData+=doc.data().sleep_min;
      dataCount++;
    });
    totalMinutes = Math.round(sleepData / dataCount);
    hours = Math.floor(totalMinutes / 60);
    minutes = Math.floor(totalMinutes % 60);
    return hours + "h " + minutes + "m";
    

  } catch (error) {
    console.error(error);
  }
}

export async function fetchStepsMonthlyP (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('polar_steps')
      .where('user_id','==', id)
      .where('month', '==', month)
      .where('year', '==', year)
      .get(); 

    if (response.empty) {
      console.log('EI ole');
      return "NA";
    }

    var stepData= 0;
    var dataCount= 0;
    response.forEach(doc => {
      stepData+=doc.data().steps;
      dataCount++;
    });
    stepData = Math.round(stepData / dataCount);
    return stepData;
    

  } catch (error) {
    console.error(error);
  }
}

export async function fetchCaloriesMonthlyP (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('polar_calories')
      .where('user_id','==', id)
      .where('month', '==', month)
      .where('year', '==', year)
      .get(); 

    if (response.empty) {
      console.log('EI ole');
      return "NA";
    }

    var calsData= 0;
    var dataCount= 0;
    response.forEach(doc => {
      calsData+=doc.data().calories;
      dataCount++;
    });
    calsData = Math.round(calsData / dataCount);
    return calsData;
    

  } catch (error) {
    console.error(error);
  }
}
