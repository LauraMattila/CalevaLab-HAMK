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
      return doc.data().fitbit_user_id;
    })
  }catch(error){
    console.error(error);
  } 
};

export async function fetchAccessToken(id) {
   try {
     console.log(id);
     var accessToken = await firestore().collection('users').where('user_id', '==', id).get();
     if (accessToken.empty) {
      console.log("Ei oo")
      return;
     }
     accessToken.forEach(doc => {
      return doc.data().fitbit_access_token;
     })
    }catch(error){
        console.error(error);
      }
    };


