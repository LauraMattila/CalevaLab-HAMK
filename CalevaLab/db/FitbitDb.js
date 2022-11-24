import firestore, {firebase} from '@react-native-firebase/firestore';
import {string} from 'prop-types';

export async function fetchUserId(id) {
  try {
    console.log(id);
    var userId = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();
    if (userId.empty) {
      console.log('EI ole');
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
    console.log(id);
    var accessToken = await firestore()
      .collection('users')
      .where('user_id', '==', id)
      .get();
    if (accessToken.empty) {
      console.log('Ei oo');
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
        date: sleepDate,
        sleep_min: sleepMin,
        user_id: id,
      };
      const res = await firestore()
        .collection('fitbit_sleep')
        .doc(sleepDate + '-' + id)
        .set(sleepData);
        } catch(error) {
          console.error(error);
        }
      };

          



export async function SaveStepsLog(stepsDate, steps, id, string) {
  try {
    const stepsData = {
      date: stepsDate,
      value: steps,
      user_id: id,
      
    };
    const res = await firestore()
      .collection('fitbit_steps')
      .doc(string + '-' + id)
      .set(stepsData);
  } catch (error) {
    console.error(error);
  }
}


        export async function SaveCaloriesLog(caloriesDate, calories, string, id) {
          try {
            const caloriesData = {
              date: caloriesDate,
              burned_calories: calories,
              user_id: id,
            };
            const res = await firestore()
              .collection('fitbit_calories')
              .doc(string + '-' + id)
              .set(caloriesData);
              } catch(error) {
                console.error(error);
              }
            };


        export async function fetchCaloriesLog(string, id) {
          try {
            //console.log(id);
            //console.log(caloriesDate);
            //const today = new Date()
            //const priorDate = new Date().setDate(today.getDate() - 7)
            var response= await firestore()
            .collection('fitbit_calories')
            .doc(string + '-' + id)
            .get();
            //console.log(sleepLog);
              if (!response.exists) {
                console.log("EI ole");   
                return;
              } else {
                  console.log(response.data);
              }
              
            }catch(error){
              console.error(error);
            } 
          };


export async function fetchSleepLog(sleepDate, id) {
  try {
    console.log(id);
    console.log(sleepDate);
    var response = await firestore()
      .collection('fitbit_sleep')
      .doc(sleepDate + '-' + id)
      .get();
    //console.log(sleepLog);
    if (!response.exists) {
      console.log('EI ole');
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
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  

  const startdate = new Date();
  startdate.setDate(today.getDate()-5);
  
  console.log("TODAY:     "+today);
  console.log("STEPSDATE:     "+startdate);
  console.log("ID:     "+id);


  try {
    var response = await firestore()
      .collection('fitbit_steps')

      
      //.where('date', '==', (startdate))
      //.where('date', '>', (today.toISOString().split('T')[0]))
      .doc((startdate.toISOString().split('T')[0]) + '-' + id)

      .doc('2022-11-22' + '-' + id)

      .get();

    if (!response.exists) {
      console.log('EI ole');
      return;
    } else {
      console.log(response.data());

      //const responseList  = [];

      // responseList.push(response.data());
      //console.log(Object.keys(responseList));

    }
  } catch (error) {
    console.error(error);
  }
}
