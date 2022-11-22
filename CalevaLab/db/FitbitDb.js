import React, {useState, useEffect} from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';




export async function fetchUserId(id) {
  try {
    console.log(id);
    var userId = await firestore().collection('users').where('user_id', '==', id).get();
    if (userId.empty) {
      console.log("EI ole");
      return;
    }
    userId.forEach(doc => {
      result = doc.data().fitbit_user_id;
    })
    return result;
  }catch(error){
    console.error(error);
  } 
};

export async function fetchAccessToken(id) {
   try {
     console.log(id);
     var accessToken = await firestore().collection('users').where('user_id', '==', id).get();
     if (accessToken.empty) {
      console.log("Ei oo");
      return;
     }
     accessToken.forEach(doc => {
      result =  doc.data().fitbit_access_token;
     })
     return result;
    }catch(error){
        console.error(error);
      }
    };

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


