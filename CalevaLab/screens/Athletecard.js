import React, {useState, useEffect} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider, Title} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {StyleSheet, Text, View, Pressable} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {
  fetchUserIdP,
  fetchAccessTokenP,
  fetchSleepP,
  fetchStepsP,
  fetchCaloriesP,
} from '../db/PolarDb';

import {
  fetchUserId,
  fetchAccessToken,
  fetchStepsLog,
  fetchSleepLog,
  fetchCaloriesLog,
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

import {fetchStepPreference, fetchCaloriesPreference, fetchSleepPreference} from '../db/UserDb';

const Athletecard = ({route,navigation}) => {
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
  const [dateArr, setDateArr] = useState([]);
  const [stepsDayList, setStepsDayList] = useState(['']);
  const [caloriesDayList, setCaloriesDayList] = useState(['']);
  const [sleepDayList, setSleepDayList] = useState(['']);
  const [userId, setUserId] = useState("1");

  useEffect(() => {
    var today = new Date();
    var startdate = new Date();
    startdate.setDate(today.getDate() - 6);
    var getDateArray = function (startdate, today) {
      var arr = new Array(),
        dt = new Date(startdate);

      while (dt <= today) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }

      return arr;
    };
    var dateArray = getDateArray(startdate, today);
    setDateArr(dateArray);

    const fetchSteps = async () => {
      var data = [];
      var preference = await fetchStepPreference(userId);
      console.log(preference);
      switch (preference) {
        case 'Polar':
          //await getActivity(userId);
          data = await fetchStepsP(userId);
          console.log(data);
          break;
        case 'Fitbit':
          //await getStepsFit(userId);
          data = await fetchStepsLog(userId);
          break;
      }

      console.log('Tässä stepsit' + data);
      dayIndex = 0;
      dbIndex = 0;
      var dbDate;
      var currentDate;
      dateList = [];
      console.log(dateArray);
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

    };

      const fetchCalories = async () => {
        var data = [];
        var preference = await fetchCaloriesPreference(userId);
        console.log(preference);
        switch (preference) {
          case 'Polar':
            //await getActivity(userId);
            data = await fetchCaloriesP(userId);
            console.log(data);
            break;
          case 'Fitbit':
            //await getCalsFit(userId);
            data = await fetchCaloriesLog(userId);
            break;
        }
  
        console.log('Tässä calories' + data);
        dayIndex = 0;
        dbIndex = 0;
        var dbDate;
        var currentDate;
        dateList = [];
        console.log(dateArray);
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
       
    };

    const fetchSleep = async () => {
      var data = [];
      var preference = await fetchSleepPreference(userId);
      console.log(preference);
      switch (preference) {
        case 'Polar':
          //await getSleep(userId);
          data = await fetchSleepP(userId);
          console.log(data);
          break;
        case 'Fitbit':
          //await getSleepDataFit(userId);
          data = await fetchSleepLog(userId);
          break;
      }

      console.log('Tässä SLeepit' + data);
      dayIndex = 0;
      dbIndex = 0;
      var dbDate;
      var currentDate;
      dateList = [];
      console.log(dateArray);
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
          dateList[dayIndex] = hours+'h'+minutes+'m';

          dbIndex += 1;
        } else {
          dateList[dayIndex] = 'NA';
        }
        dayIndex += 1;
      });
      setSleepDayList(dateList);
    };

    fetchSleep();
    fetchCalories();
    fetchSteps();
  }, [userId]);

  var [day1, day2, day3, day4, day5, day6, day7] = dateArr;

  return (
    <PaperProvider>
      <SwitchSelector
        options={kuka}
        initial={0}
        onPress={value => setUserId(value)}
      />
      <View>
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

        <View style={styles.datacont}>
          <View style={styles.selectioncont}>
            <View style={styles.selectionheader}>
              <Text style={styles.selectiontext}>Stats</Text>
            </View>

            <View style={styles.selector}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={value => console.log(`Selected: ${value}`)}
              />
            </View>
          </View>


          

          <DataTable>
            <DataTable.Header style={styles.weekdays}>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title textStyle={{fontSize: 17}} numeric>{Moment(day1).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}} numeric>{Moment(day2).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}}numeric>{Moment(day3).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}} numeric>{Moment(day4).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}}numeric>{Moment(day5).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}}numeric>{Moment(day6).format('ddd')}</DataTable.Title>
              <DataTable.Title  textStyle={{fontSize: 17}}numeric>{Moment(day7).format('ddd')}</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.row}>
              <DataTable.Cell>STEPS</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[0]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[1]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[2]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[3]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[4]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[5]}</DataTable.Cell>
              <DataTable.Cell numeric>{stepsDayList[6]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.row}>
              <DataTable.Cell>KCAL</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[0]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[1]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[2]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[3]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[4]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[5]}</DataTable.Cell>
              <DataTable.Cell numeric>{caloriesDayList[6]}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.row}>
              <DataTable.Cell>SLEEP</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[1]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
              <DataTable.Cell textStyle={{fontSize: 13}}  numeric> {sleepDayList[0]}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </View>
      <View style={styles.sharecont}>
        <Pressable style={styles.sharebutton}>
          <Text style={styles.sharetext}>Share</Text>
        </Pressable>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  infocont: {
    marginVertical: 20,
    flexDirection: 'row',
    height: 70,
  },
  name: {
    textAlign: 'left',
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'left',
    marginHorizontal: 20,
    fontSize: 13,
  },

  datacont: {
    marginVertical: 40,
  },

  selectioncont: {
    flexDirection: 'row',
    marginVertical: 20,
  },

  selectionheader: {
    marginVertical: -10,
    width: 150,
  },

  selectiontext: {
    fontSize: 20,
    margin: 15,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 20,
  },

  selector: {
    width: 230,
  },

  weekdays: {
    marginLeft: -15,
    marginHorizontal: -15,
  },
  row: {
    marginHorizontal: -12,
    marginVertical: 12,
  },
  sharecont: {
    alignItems: 'center',
  },

  sharebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: '#1e90ff',
    width: 200,
    height: 75,
  },
  sharetext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Athletecard;
