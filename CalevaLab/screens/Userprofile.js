import React, {useState, useEffect, Component} from 'react';
import {PermissionsAndroid} from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';

import {
  fetchCaloriesPreference,
  fetchStepPreference,
  fetchSleepPreference,
  setSleepPreference,
  setStepsPreference,
  setCaloriesPreference
} from '../db/UserDb';

//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Modal, Provider as PaperProvider} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {RadioButton} from 'react-native-paper';
import {CameraScreen} from 'react-native-camera-kit';

const Userprofile = ({navigation}) => {
  const [firstname, setFirstname] = useState('Matti');
  const [lastname, setLastname] = useState('Meikäläinen');
  const [age, setAge] = useState('55');
  const [gender, setGender] = useState('Male');

  const [Sleepchecked, setSleepChecked] = React.useState('');
  const [Stepschecked, setStepsChecked] = React.useState('');
  const [Calschecked, setCalsChecked] = React.useState('');

  
  const [visibility, setVisibility] = useState(false);
  const [doc, setDoc] = useState('1');
  const [userId, setUserId] = useState('1');


  const setSleep = async () => {
    var preference = await fetchSleepPreference(userId);
    switch (preference) {
      case 'Polar':
        var sleep = 'Fitbit';
        setSleepChecked('sleepfit');
        await setSleepPreference(doc, sleep);

        break;
   
    }
  };

  const setSleep2 = async () => {
    var preference = await fetchSleepPreference(userId);
    switch (preference) {
      case 'Fitbit':
        var sleep = 'Polar';
        setSleepChecked('sleeppolar');
        await setSleepPreference(doc, sleep);

        break;
   
    }
  };

  
  const setSteps = async () => {
    var preference = await fetchStepPreference(userId);
    switch (preference) {
      case 'Polar':
        var steps = 'Fitbit';
        setStepsChecked('stepsfit');
        await setStepsPreference(doc, steps);

        break;
   
    }
  };
  const setSteps2 = async () => {
    var preference = await fetchSleepPreference(userId);
    switch (preference) {
      case 'Fitbit':
        var steps = 'Polar';
        setStepsChecked('stepspolar');
        await setStepsPreference(doc, steps);

        break;
   
    }
  };



  return (
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

      
      <DataTable style={styles.datacont}>
        <DataTable.Header>
          <DataTable.Title>Service</DataTable.Title>
          <DataTable.Title>Sleep</DataTable.Title>
          <DataTable.Title>Steps</DataTable.Title>
          <DataTable.Title>Calories</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>POLAR</DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="sleeppolar"
                status={Sleepchecked === 'sleeppolar' ? 'checked' : 'unchecked'}
                onPress={() => setSleep2()}
              />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="stepspolar"
                status={Stepschecked === 'stepspolar' ? 'checked' : 'unchecked'}
                onPress={() => setStepsChecked('stepspolar')}
              />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="calspolar"
                status={Calschecked === 'calspolar' ? 'checked' : 'unchecked'}
                onPress={() => setCalsChecked('calspolar')}
              />
            </View>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>FITBIT</DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="sleepfit"
                status={Sleepchecked === 'sleepfit' ? 'checked' : 'unchecked'}
                onPress={() => setSleep()}
              />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="stepsfit"
                status={Stepschecked === 'stepsfit' ? 'checked' : 'unchecked'}
                onPress={() => setStepsChecked('stepsfit')}
              />
            </View>
          </DataTable.Cell>
          <DataTable.Cell>
            <View>
              <RadioButton
                value="calsfit"
                status={Calschecked === 'calsfit' ? 'checked' : 'unchecked'}
                onPress={() => setCalsChecked('calsfit')}
              />
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  infocont: {
    marginVertical: 150,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 13,
  },
});
export default Userprofile;
