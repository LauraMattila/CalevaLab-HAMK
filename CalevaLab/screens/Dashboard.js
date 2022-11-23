import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
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
import {fetchUserId, fetchAccessToken} from '../db/FitbitDb';
import {fetchUserIdP, fetchAccessTokenP} from '../db/PolarDb';
import {getSleepDataFit} from '../components/FitbitApi';
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
  const [summary, setSummary] = useState();
  const [sleep, setSleep] = useState();
  const [users, setUsers] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState('2');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    //getSleep();
    //postSomething();
    //putSomething();
    //getActivity();
  }, []);

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

      <View style={styles.app}>
        <Button title="perse" onPress={() => fetchUserId(userId)}></Button>
        <Button title="polarId" onPress={() => fetchUserIdP(userId)}></Button>
        <Button
          title="polarAccess"
          onPress={() => fetchAccessTokenP(userId)}></Button>
        <Button title="polar sleep" onPress={() => getSleep(userId)}></Button>
        <Button title="Kives" onPress={() => getSleepDataFit(userId)}></Button>
        <Button title="Activities" onPress={() => getActivity(userId)}></Button>

        
      </View>

      <View>
        <FlatList
          style={{flex: 1}}
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => (
            <View>
              <Text>
                {' '}
                {item.item.id} {item.item.fname} {item.item.lname}{' '}
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
});

export default Dashboard;
