import React, {useState, useEffect, Component} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider, Title} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

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

  const [user, setUser] = useState('');
  const ref = firestore().collection('users');
  const ref2 = firestore().collection('fitbit_steps');
  const [summary, setSummary] = useState();
  const [sleep, setSleep] = useState();
  const [users, setUsers] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState('1');

  const [accessToken, setAccessToken] = useState('');

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

  var dateArr = getDateArray(startdate, today);

  var [day1, day2, day3, day4, day5, day6, day7] = dateArr;

  console.log('TODAY:' + day7);

  return (
    <PaperProvider>
      <View>
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>
              {firstname} {lastname}
            </Text>

            <Text style={styles.info}>
              {age} | {gender}
            </Text>
          </View>
        </View>
        <View style={styles.datatablecont}>
          <View style={styles.sele}>
            <View style={styles.selection}>
              <Text style={styles.header}>Stats</Text>
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
            <DataTable.Header style={styles.Title}>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title>MON</DataTable.Title>
              <DataTable.Title>TUE</DataTable.Title>
              <DataTable.Title>WED</DataTable.Title>
              <DataTable.Title>THU</DataTable.Title>
              <DataTable.Title>FRI</DataTable.Title>
              <DataTable.Title>SAT</DataTable.Title>
              <DataTable.Title>SUN</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.Row}>
              <DataTable.Cell>STEPS</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
              <DataTable.Cell numeric>10000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.Row}>
              <DataTable.Cell>KCAL</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
              <DataTable.Cell numeric>2000</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.Row}>
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
        <Pressable style={styles.share}>
          <Text style={styles.sharetext}>Share</Text>
        </Pressable>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
    height: 70,
  },

  header: {
    fontSize: 20,
    margin: 15,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 20,
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

  sele: {
    flexDirection: 'row',
  },

  sharetext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  share: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 40,
    backgroundColor: '#1e90ff',
    width: 200,
    height: 75,
  },

  sharecont: {
    alignItems: 'center',
  },

  datatablecont: {
    marginVertical: 40,
  },

  Row: {
    marginHorizontal: -10,
    marginVertical: 10,
  },

  Title: {
    marginLeft: 10,
    marginHorizontal: -35,
  },
});

export default Athletecard;
