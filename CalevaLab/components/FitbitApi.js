
import {fetchUserId, fetchAccessToken} from './db/FitbitDb';



 export async function getSleepDataFit(id) {
    try {
      console.log(user_id);
      const user_id = fetchUserId(id);
      
      const URL = 'https://api.fitbit.com/1.2/user/'+user_id+'/sleep/list.json';
      const accessToken = fetchAccessToken(id);
      const response = await fetch(URL,
        {
          method: 'GET',
          headers: {
            authorization: 
            'Bearer '+accessToken,
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

