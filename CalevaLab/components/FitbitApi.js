import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';


const FitbitApi = () => {

  const [steps, setSteps] = useState();
  const [sleep, setSleep] = useState();
  const [calories, setCalories] = useState();

  const ref = firestore().collection('Users');
  const dateRef = firestore().collection('date');

/*   useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { fname, lname } = doc.data();
        list.push({
          id: doc.id,
          fname,
          lname,
        });
      });

      setUsers(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    return dateRef.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { date } = doc.data();
        list.push({
          id: doc.id,
          date,
        });
      });

      setDates(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []); */


  const getSleepDataFit = async () => {
    try {
      const response = await fetch(
        'https://api.fitbit.com/1.2/user/B8HWHQ/sleep/list.json',
        {
          method: 'GET',
          headers: {
            authorization: 
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhUWDciLCJzdWIiOiJCOEhXSFEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3c2xlIHdhY3QiLCJleHAiOjE3MDAxMzA4NzksImlhdCI6MTY2ODc2MjM1OX0._RBCDMv1gvOW8SIVHWfXierFREvyy2S_PYwA44jefJg',
            accept: 'application/json',
          },
        },
      );

      const json = await response.json();
      console.log('Sleep (minutes) = ' + json.summary['totalMinutesAsleep']);
      setSleep(json.summary['totalMinutesAsleep']);
    } catch (error) {
      console.error(error);
    }
  };


  const getStepsFit = async () => {
    try {
      const response = await fetch(
        'https://api.fitbit.com/1.2/user/B8HWHQ/activities/date/2022-11-18.json',
        {
          method: 'GET',
          headers: {
            authorization: 
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhUWDciLCJzdWIiOiJCOEhXSFEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3c2xlIHdhY3QiLCJleHAiOjE3MDAxMzA4NzksImlhdCI6MTY2ODc2MjM1OX0._RBCDMv1gvOW8SIVHWfXierFREvyy2S_PYwA44jefJg',
            accept: 'application/json',
          },
        },
      );
      const json = await response.json();

      console.log('Steps = ' + json.summary['steps']);
      setSteps(json.summary['steps']);
    } catch (error) {
      console.error(error);
    }
  };

  const getCalsFit = async () => {
    try {
      const response = await fetch(
        'https://api.fitbit.com/1.2/user/B8HWHQ/activities/date/2022-11-18.json',
        {
          method: 'GET',
          headers: {
            authorization: 
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhUWDciLCJzdWIiOiJCOEhXSFEiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3c2xlIHdhY3QiLCJleHAiOjE3MDAxMzA4NzksImlhdCI6MTY2ODc2MjM1OX0._RBCDMv1gvOW8SIVHWfXierFREvyy2S_PYwA44jefJg',
            accept: 'application/json',
          },
        },
      );
      const json = await response.json();

      console.log('Calories = ' + json.summary.calories['total']);
      setCalories(json.summary.calories['total']);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text>Todays Sleep (minutes): {sleep}</Text>
      <Button style={styles.Button}
        title="Get sleep data from Fitbit"
        onPress={() => getSleepDataFit()}></Button>
     
      <Text>Todays Steps: {steps}</Text>
      <Button
        title="Get steps from Fitbit"
        onPress={() => getStepsFit()}></Button>
         
      <Text>Todays Calories: {calories}</Text>
      <Button
        title="Get calories from Fitbit"
        onPress={() => getCalsFit()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    
  }
});

export default FitbitApi;