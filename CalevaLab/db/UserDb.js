import firestore, {firebase} from '@react-native-firebase/firestore';

export async function fetchStepPreference(id) {
    try {
      var userId = await firestore()
        .collection('users')
        .where('user_id', '==', id)
        .get();
      if (userId.empty) {
        console.log('EI OLE USERID');
        return;
      }
      userId.forEach(doc => {
        result = doc.data().steps_preference;
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  export async function fetchCaloriesPreference(id) {
    try {
      var userId = await firestore()
        .collection('users')
        .where('user_id', '==', id)
        .get();
      if (userId.empty) {
        console.log('EI OLE USERID');
        return;
      }
      userId.forEach(doc => {
        result = doc.data().calories_preference;
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  export async function fetchSleepPreference(id) {
    try {
      var userId = await firestore()
        .collection('users')
        .where('user_id', '==', id)
        .get();
      if (userId.empty) {
        console.log('EI OLE USERID');
        return;
      }
      userId.forEach(doc => {
        result = doc.data().sleep_preference;
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }