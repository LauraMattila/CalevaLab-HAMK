
import firestore, { firebase } from '@react-native-firebase/firestore';


const FitbitDb = () => {

async function fetchUserId(id) {
  try {
    var userId = await firestore().collection('users').where('user_id', '==', id).get();
    //console.log(userId);

  }catch(error){
    console.error(error);
  } 
};

async function fetchAccessToken(id) {
   try {
     var accessToken = await firestore().collection('users').where('user_id', '==', id).get('fitbit_access_token');
     console.log(accessToken);
    }catch(error){
        console.error(error);
      }
    };
};

export default FitbitDb;