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

   export async function updateUserInfo(fname, lname, gender, age, id) {
    try {
      const res = await firestore()
        .collection('users')
        .doc(id)
        .update({ fname: fname,
          lname: lname,
          gender: gender,
          age: age});
      console.log('User saved');
    } catch (error) {
      console.error(error);
    }
    
  } 

  export async function fetchUserInfo(id) {
    try {
      
      var userId = await firestore()
        .collection('users')
        .where('user_id', '==', id)
        .get();
      if (userId.empty) {
        console.log('EI OLE USERID');
        return;
      }
      var user_data;
      userId.forEach(doc => { 
        const result = doc.data();
        user_data = {
          fname: result.fname,
          lname: result.lname,
          gender: result.gender,
          age: result.age
        }
        console.log(user_data);
        
      });
      return user_data;
      
    } catch (error) {
      console.error(error);
    }
  }
