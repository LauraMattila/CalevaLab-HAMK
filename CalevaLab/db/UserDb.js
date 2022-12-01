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

export async function setSleepPreference(docid, sleepPref) {
  try {
    var res = await firestore()
      .collection('users')
      .doc(docid)
      .update({sleep_preference: sleepPref});
  } catch (error) {
    console.error(error);
  }
}
export async function setStepsPreference(docid, stepsPref) {
  try {
    var res = await firestore()
      .collection('users')
      .doc(docid)
      .update({steps_preference: stepsPref});
  } catch (error) {
    console.error(error);
  }
}

export async function setCaloriesPreference(docid, caloriesPref) {
  try {
    var res = await firestore()
      .collection('users')
      .doc(docid)
      .update({calories_preference: caloriesPref});
  } catch (error) {
    console.error(error);
  }
}
