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
      console.log(doc.data().fitbit_user_id);
    })
  }catch(error){
    console.error(error);
  } 
};

export async function fetchAccessToken(id) {
   try {
     var accessToken = await firestore().collection('users').where('user_id', '==', id).get();
     console.log(accessToken);
    }catch(error){
        console.error(error);
      }
    };


