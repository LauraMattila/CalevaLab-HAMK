import React, {useState, useEffect, Component} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';
import WeekData from '../components/WeekData';
import MonthData from '../components/MonthData';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  Pressable,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {
  fetchUserIdP,
  fetchAccessTokenP,
  fetchSleepP,
  fetchStepsP,
  fetchCaloriesP,
  fetchStepsWeeklyP,
} from '../db/PolarDb';

import {
  fetchUserId,
  fetchAccessToken,
  fetchStepsLog,
  fetchSleepLog,
  fetchCaloriesLog,
  fetchStepsWeeklyF,
} from '../db/FitbitDb';

import {
  getSleepDataFit,
  getStepsFit,
  getCalsFit,
} from '../components/FitbitApi';

import {
  getSleep,
  postSomething,
  getActivity,
  putSomething,
  listActivity,
  testActivity,
} from '../components/PolarApi';

import {
  fetchCaloriesPreference,
  fetchStepPreference,
  fetchSleepPreference,
  fetchUserInfo
} from '../db/UserDb';

import {
  fetchWeeklyCalories,
  fetchWeeklySleep,
  fetchWeeklySteps,
  fetchMonthlySleep,
  fetchMonthlySteps,
  fetchMonthlyCalories

} from '../db/testing';

const Dashboard = ({navigation}) => {
  const options = [
    {label: 'days', value: 'days'},
    {label: 'weeks', value: 'weeks'},
    {label: 'months', value: 'months'},
  ];

  const kuka = [
    {label: 'Sampo', value: '1'},
    {label: 'Jere', value: '2'},
    {label: 'Janette', value: '3'},
    {label: 'Laura', value: '4'},
  ];

  const [firstname, setFirstname] = useState('Matti');
  const [lastname, setLastname] = useState('Meikäläinen');
  const [age, setAge] = useState('55');
  const [gender, setGender] = useState('Male');

  const [user, setUser] = useState('');
  const ref = firestore().collection('users');
  const ref2 = firestore().collection('fitbit_steps');
  const [summary, setSummary] = useState();
  const [sleep, setSleep] = useState();
  const [calories, setCalories] = useState();
  const [users, setUsers] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [loading, setLoading] = useState(true);


  const [userId, setUserId] = useState('1');


  const [stepsDayList, setStepsDayList] = useState(['']);
  const [stepsWeekList, setStepsWeekList] = useState(['']);
  const [stepsMonthList, setStepsMonthList] = useState(['']);

  const [caloriesDayList, setCaloriesDayList] = useState(['']);
  const [caloriesWeekList, setCaloriesWeekList] = useState(['']);
  const [caloriesMonthList, setCaloriesMonthList] = useState(['']);

  const [sleepDayList, setSleepDayList] = useState(['']);
  const [sleepWeekList, setSleepWeekList] = useState(['']);
  const [sleepMonthList, setSleepMonthList] = useState(['']);

  const [dateArr, setDateArr] = useState([]);

  const [accessToken, setAccessToken] = useState('');
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  

  var getDateArray = function (startdate, today) {
    var arr = new Array(),
      dt = new Date(startdate);

    while (dt <= today) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;
  };

  useEffect(() => {
    const setUserInfo = async () => {
      var userInfo = await fetchUserInfo(userId);
      setFirstname(userInfo.fname);
      setLastname(userInfo.lname);
      setGender(userInfo.gender);
      setAge(userInfo.age);
      console.log(
        ' TOIMIIKOTOIMIIKOTOIMIIIIKOTOIMIIIKO :   ' + userInfo.gender,
      );
    };

    var today = new Date();
    var startdate = new Date();
    startdate.setDate(today.getDate() - 6);

    var dateArray = getDateArray(startdate, today);
    setDateArr(dateArray);

    const fetchSteps = async () => {
      var data = [];
      var preference = await fetchStepPreference(userId);
      console.log('STEPS PREFERENCE:   ' + preference);
      switch (preference) {
        case 'Polar':
          //await getActivity(userId);
          data = await fetchStepsP(userId);
          // console.log(data);
          break;
        case 'Fitbit':
          //await getStepsFit(userId);
          data = await fetchStepsLog(userId);
          break;
      }

      //console.log('Tässä stepsit' + data);
      dayIndex = 0;
      dbIndex = 0;
      var dbDate;
      var currentDate;
      var dateList = [];
      //console.log(dateArray);
      dateArray.forEach(date => {
        try {
          currentDate = date.toISOString().slice(0, 10);
          if (data[dbIndex] != undefined) {
            dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
          }
        } catch (error) {
          console.error(error);
        }
        if (dbDate == currentDate) {
          dateList[dayIndex] = data[dbIndex].steps;

          dbIndex += 1;
        } else {
          dateList[dayIndex] = 'NA';
        }
        dayIndex += 1;
      });
      setStepsDayList(dateList);
      setStepsWeekList(await fetchWeeklySteps(userId));
      setStepsMonthList(await fetchMonthlySteps(userId));
      
    };

    const fetchCalories = async () => {
      var data = [];
      var preference = await fetchCaloriesPreference(userId);
      console.log('CALS PREFERENCE:   ' + preference);
      switch (preference) {
        case 'Polar':
          //await getActivity(userId);
          data = await fetchCaloriesP(userId);
          //console.log(data);
          break;
        case 'Fitbit':
          //await getCalsFit(userId);
          data = await fetchCaloriesLog(userId);
          break;
      }

      // console.log('Tässä calories' + data);
      dayIndex = 0;
      dbIndex = 0;
      var dbDate;
      var currentDate;
      var dateList = [];
      // console.log(dateArray);
      dateArray.forEach(date => {
        try {
          currentDate = date.toISOString().slice(0, 10);
          if (data[dbIndex] != undefined) {
            dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
          }
        } catch (error) {
          console.error(error);
        }
        if (dbDate == currentDate) {
          dateList[dayIndex] = data[dbIndex].calories;
          dbIndex += 1;
        } else {
          dateList[dayIndex] = 'NA';
        }
        dayIndex += 1;
      });
      setCaloriesDayList(dateList);
      setCaloriesWeekList(await fetchWeeklyCalories(userId));
      setCaloriesMonthList(await fetchMonthlyCalories(userId));
    };

    const fetchSleep = async () => {
      var data = [];
      var preference = await fetchSleepPreference(userId);
      console.log('SLEEP PREFERENCE:   ' + preference);
      switch (preference) {
        case 'Polar':
          //await getSleep(userId);
          data = await fetchSleepP(userId);
          // console.log(data);
          break;
        case 'Fitbit':
          //await getSleepDataFit(userId);
          data = await fetchSleepLog(userId);
          break;
      }

      // console.log('Tässä SLeepit' + data);
      dayIndex = 0;
      dbIndex = 0;
      var dbDate;
      var currentDate;
      var dateList = [];
      //console.log(dateArray);
      dateArray.forEach(date => {
        try {
          currentDate = date.toISOString().slice(0, 10);
          if (data[dbIndex] != undefined) {
            dbDate = data[dbIndex].date.toDate().toISOString().slice(0, 10);
          }
        } catch (error) {
          console.error(error);
        }
        if (dbDate == currentDate) {
          var totalMinutes = data[dbIndex].sleep_min;
          const hours = Math.floor(totalMinutes / 60);
          const minutes = Math.floor(totalMinutes % 60);
          dateList[dayIndex] = hours + 'h ' + minutes + 'm';
          dbIndex += 1;
        } else {
          dateList[dayIndex] = 'NA';
        }
        dayIndex += 1;
      });
      setSleepDayList(dateList);
      setSleepWeekList(await fetchWeeklySleep(userId));
      setSleepMonthList(await fetchMonthlySleep(userId));
    };
    
    fetchSleep();
    fetchSteps();
    fetchCalories();
    setUserInfo();
  }, [userId]);

  var [day1, day2, day3, day4, day5, day6, day7] = dateArr;

  // console.log('USER:   ' + userId);

  console.log('TODAY:' + day7);

  const showTable = value => {
    if (value == 'days') {
      setShow(true);
      setShow2(false);
      setShow3(false);
    } else if (value == 'weeks') {
      setShow3(false);
      setShow(false);
      setShow2(true);
    } else if (value == 'months') {
      setShow(false);
      setShow2(false);
      setShow3(true);
    }
  };

  return (
    <PaperProvider>
      <SwitchSelector
        options={kuka}
        initial={1}
        onPress={value => setUserId(value)}
      />
      <View>
        <Text style={styles.header}>Welcome Back!</Text>

        <View style={styles.infocont}>
          <View>
            <Text style={styles.name}>
              {firstname} {lastname}
            </Text>

            <Text style={styles.info}>
              {age} | {gender}
            </Text>
          </View>
        </View>

        <View style={styles.selectioncont}>
          <View style={styles.selection}>
            <Text style={styles.header}>Activity Logs</Text>
          </View>
          <View style={styles.selector}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => showTable(value)}
            />
          </View>
        </View>

        {show ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Day</DataTable.Title>
              <DataTable.Title numeric>Sleep</DataTable.Title>
              <DataTable.Title numeric>Steps</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day7).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[6]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[6]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[6]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day6).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[5]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[5]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[5]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day5).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[4]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[4]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[4]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day4).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[3]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[3]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[3]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day3).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[2]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[2]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[2]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day2).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[1]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[1]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[1]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{Moment(day1).format('DD.MM.')}</DataTable.Cell>
              <DataTable.Cell numeric>{sleepDayList[0]} </DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[0]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[0]}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        ) : null}

        {show2 ? (
          <WeekData
            steps={stepsWeekList}
            sleep={sleepWeekList}
            calories={caloriesWeekList}
          />
        ) : null}

        {show3 ?(
         <MonthData
            sleep={sleepMonthList}
            steps={stepsMonthList}
            calories={caloriesMonthList}
         />
        )  : null}
        <Button
          title="POlar Activities"
          onPress={() => fetchMonthlySleep(userId)}></Button>
        <Button
          title="Get polar Sleep"
          onPress={() => fetchSleepP(userId)}></Button>

        <Button title="Fitbit id" onPress={() => fetchUserId(userId)}></Button>
        <Button title="polarId" onPress={() => fetchUserIdP(userId)}></Button>
        <Button
          title="polarAccess"
          onPress={() => fetchAccessTokenP(userId)}></Button>

        <Button
          title="Set polar sleep"
          onPress={() => getSleep(userId)}></Button>
        <Button
          title="POlar Activities"
          onPress={() => getActivity(userId)}></Button>
        <Button
          title="Get polar Sleep"
          onPress={() => fetchSleepP(userId)}></Button>
        <Button
          title="Get polar steps"
          onPress={() => fetchStepsP(userId)}></Button>
        <Button
          title="Get polar Calories"
          onPress={() => fetchCaloriesP(userId)}></Button>
        <Button title="polar sleep" onPress={() => getSleep(userId)}></Button>
        <Button
          title="fitbit sleep"
          onPress={() => getSleepDataFit(userId)}></Button>
        <Button
          title="FitBit Calories"
          onPress={() => getCalsFit(userId)}></Button>
        <Button
          title="fitbit steps"
          onPress={() => getStepsFit(userId)}></Button>
        <Button
          title="fitbit steps from db"
          onPress={() => fetchStepsLog(userId)}></Button>
        <Button
          title="fitbit sleep from db"
          onPress={() => fetchSleepLog(userId)}></Button>
        <Button
          title="fitbit calories from db"
          onPress={() => fetchCaloriesLog(userId)}></Button>

        <View>
          <FlatList
            style={{flex: 1}}
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={item => (
              <View>
                <Text>
                  {' '}
                  {item.item.user_id} {item.item.sleepMin} {item.item.sleepDate}{' '}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    margin: 15,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  infocont: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
    height: 70,
  },

  name: {
    textAlign: 'left',
    marginHorizontal: 20,
    marginVertical: 7,
    fontSize: 16,
    fontWeight: 'bold',
  },

  info: {
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 13,
  },

  selectioncont: {
    flexDirection: 'row',
  },

  selection: {
    margin: 2,
    marginVertical: -5,
    width: 150,
  },

  selector: {
    margin: 2,
    marginVertical: 2,
    width: 230,
  },
});

export default Dashboard;
