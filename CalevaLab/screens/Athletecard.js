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

const Athletecard = ({navigation}) => {
  const options = [
    {label: 'days', value: 'days'},
    {label: 'weeks', value: 'weeks'},
    {label: 'months', value: 'months'},
  ];

  const [firstname, setFirstname] = useState('Matti');
  const [lastname, setLastname] = useState('Meikäläinen');
  const [age, setAge] = useState('55');
  const [gender, setGender] = useState('Male');
  const [dateArr, setDateArr] = useState([]);
  const [stepsDayList, setStepsDayList] = useState(['']);
  const [userId, setUserId] = useState('1');

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
      await getStepsFit(userId);
      const data = await fetchStepsLog(userId);
      console.log('Tässä stepsit ' + data);
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
          dateList[dayIndex] = data[dbIndex].value;
          dbIndex += 1;
        } else {
          dateList[dayIndex] = 'NA';
        }
        dayIndex += 1;
      });
      setStepsDayList(dateList);
    };
    fetchSteps();
  }, []);

 
  var [day1, day2, day3, day4, day5, day6, day7] = dateArr;

  return (
    <PaperProvider>
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
              <DataTable.Title>{Moment(day1).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day2).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day3).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day4).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day5).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day6).format('DD.MM.')}</DataTable.Title>
              <DataTable.Title>{Moment(day7).format('DD.MM.')}</DataTable.Title>
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
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.row}>
              <DataTable.Cell>SLEEP</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
              <DataTable.Cell numeric>8.0</DataTable.Cell>
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
    marginLeft: 10,
    marginHorizontal: -35,
  },
  row: {
    marginHorizontal: -10,
    marginVertical: 10,
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
