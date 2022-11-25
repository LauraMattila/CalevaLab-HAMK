import React, {useState, useEffect, Component} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider} from 'react-native-paper';
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

const Dashboard = ({navigation}) => {
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
              onPress={value => console.log(`Selected: ${value}`)}
            />
          </View>
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Day</DataTable.Title>
            <DataTable.Title numeric>Sleep</DataTable.Title>
            <DataTable.Title numeric>Steps</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day7).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day6).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day5).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day4).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day3).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day2).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>{Moment(day1).format('DD.MM.')}</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        {/* <Button title="Fitbit id" onPress={() => fetchUserId(userId)}></Button>
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
          onPress={() => fetchCaloriesLog(userId)}></Button>  */}

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
