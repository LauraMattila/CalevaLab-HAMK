import firestore, {firebase} from '@react-native-firebase/firestore';
import {string} from 'prop-types';


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
      month: new Date(sleepDate).getMonth(),
      year: new Date(sleepDate).getFullYear(),
      week: new Date(sleepDate).getWeek()
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
      steps: parseInt(steps),
      user_id: id,
      month: stepsDate.getMonth(),
      year: stepsDate.getFullYear(),
      week: stepsDate.getWeek()
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
      calories: parseInt(calories),
      user_id: id,
      month: caloriesDate.getMonth(),
      year: caloriesDate.getFullYear(),
      week: caloriesDate.getWeek()
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

    if (response.empty) {
        console.log('EI OLE SLEEP');
        return;
      } else {
        sleepDataFit = [];
        response.forEach(doc => {
          sleepDataFit.push(doc.data());
        });
        return sleepDataFit;
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
export async function fetchStepsWeeklyF(id, date) {
  try {

    var response = await firestore()
      .collection('fitbit_steps')
      .where('user_id','==', id)
      .where('date', '>=', date)
      .get(); 


     
    if (response.empty) {
      console.log('EI ole');
      return;
    }

    var stepsData = [];
    response.forEach(doc => {
      stepsData.push(doc.data());
    });
    return stepsData;
    

  } catch (error) {
    console.error(error);
  }
}
export async function fetchSleepWeeklyF(id, date) {
  try {

    var response = await firestore()
      .collection('fitbit_sleep')
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
export async function fetchCaloriesWeeklyF(id, date) {
  try {

    var response = await firestore()
      .collection('fitbit_calories')
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

export async function fetchSleepMonthlyF (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('fitbit_sleep')
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

export async function fetchStepsMonthlyF (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('fitbit_steps')
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

export async function fetchCaloriesMonthlyF (month, year, id) {
  try {
  
    var response = await firestore()
      .collection('fitbit_calories')
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
