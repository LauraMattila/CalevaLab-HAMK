import React, {useState, useEffect, Component} from 'react';
import {PermissionsAndroid} from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  Pressable,

  Image,
  Platform,
  PermissionsAndroid,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Button, Provider as PaperProvider} from 'react-native-paper';


} from 'react-native';

import {
  fetchCaloriesPreference,
  fetchStepPreference,
  fetchSleepPreference,
  setSleepPreference,
  setStepsPreference,
  setCaloriesPreference
} from '../db/UserDb';

import {Modal, Provider as PaperProvider} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {RadioButton} from 'react-native-paper';
import {CameraScreen} from 'react-native-camera-kit';

import {
  fetchCaloriesPreference,
  fetchStepPreference,
  fetchSleepPreference,
} from '../db/UserDb';

const Userprofile = ({navigation}) => {
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



  const [filePath, setFilePath] = useState({});
  const [filePathh, setFilePathh] = useState(
    'file:///data/user/0/com.calevalab/cache/rn_image_picker_lib_temp_eb789d88-e013-49fe-8cee-7ff5df0ee410.jpg',
  );

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else
          response['assets'].forEach(item => {
            const base64 = item.base64;
            const uri = item.uri;
            const width = item.width;
            const height = item.height;
            const fileSize = item.fileSize;
            const type = item.type;
            const fileName = item.fileName;

            setFilePathh(uri);

            console.log('FILEPATH:                 ' + uri);
          });
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else
        response['assets'].forEach(item => {
          const base64 = item.base64;
          const uri = item.uri;
          const width = item.width;
          const height = item.height;
          const fileSize = item.fileSize;
          const type = item.type;
          const fileName = item.fileName;

          setFilePathh(uri);

          console.log('FILEPATH:                 ' + filePathh);
        });
    });
  };

  return (
    <View>

      <SwitchSelector
        options={kuka}
        initial={0}
        onPress={value => setUserId(value)}
      />

    

      <View style={styles.infocont}>

        <View>
          <View style={styles.container}>
            <Image
              style={{width: 120, height: 120, borderRadius: 75}}
              source={{uri: filePathh}}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => captureImage('photo')}>
              <Text style={styles.textStyle}> Take a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => chooseFile('photo')}>
              <Text style={styles.textStyle}> Choose Image</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginVertical: 100,
    flexDirection: 'row',
    height: 20,
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

  sharecont: {
    alignItems: 'center',
    marginVertical: 60,
  },

  sharebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#1e90ff',
    width: 100,
    height: 100,
  },
  sharetext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Userprofile;
