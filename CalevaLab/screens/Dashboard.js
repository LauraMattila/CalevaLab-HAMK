import React, {useState, useEffect, Component} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Col, Row, Grid} from 'react-native-easy-grid';
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

import {fetchUserIdP, fetchAccessTokenP, fetchSleepP, fetchStepsP, fetchCaloriesP} from '../db/PolarDb';

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


  const [userId, setUserId] = useState('3');


  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {fname, lname} = doc.data();
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

  return (
    <View>
      <Text style={styles.header}>Welcome Back!</Text>

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

      <View style={styles.sele}>
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

      <Grid>
        <Col>
          <Text>1</Text>
        </Col>
        <Col>
          <Row>
            <Text>2</Text>
          </Row>
          <Row>
            <Text>3</Text>
          </Row>
        </Col>
      </Grid>

       {/* <Button title="Fitbit id" onPress={() => fetchUserId(userId)}></Button>
        <Button title="polarId" onPress={() => fetchUserIdP(userId)}></Button>
        <Button
          title="polarAccess"
          onPress={() => fetchAccessTokenP(userId)}></Button>

        <Button title="Set polar sleep" onPress={() => getSleep(userId)}></Button>
        <Button title="POlar Activities" onPress={() => getActivity(userId)}></Button>
        <Button title="Get polar Sleep" onPress={() => fetchSleepP(userId)}></Button>
        <Button title="Get polar steps" onPress={() => fetchStepsP(userId)}></Button>
        <Button title="Get polar Calories" onPress={() => fetchCaloriesP(userId)}></Button>
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
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
    height: 70,
  },

  header: {
    fontSize: 20,
    margin: 15,
    textAlign: 'left',
    fontWeight: 'bold',
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

  app: {
    margin: 2,
  },

  container2: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
});

export default Dashboard;
