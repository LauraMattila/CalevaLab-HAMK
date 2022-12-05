import React, {useState, useEffect, Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableHighlight,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

import {
  fetchCaloriesPreference,
  fetchStepPreference,
  fetchSleepPreference,
  setSleepPreference,
  setStepsPreference,
  setCaloriesPreference,
  fetchUserInfo,
  updateUserInfo,
} from '../db/UserDb';

import {fetchAccessTokenP} from '../db/PolarDb';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {RadioButton} from 'react-native-paper';

const Userprofile = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const kuka = [
    {label: 'Sampo', value: '1'},
    {label: 'Jere', value: '2'},
    {label: 'Janette', value: '3'},
    {label: 'Laura', value: '4'},
  ];

  const [Sleepchecked, setSleepChecked] = React.useState('');
  const [Stepschecked, setStepsChecked] = React.useState('');
  const [Calschecked, setCalsChecked] = React.useState('');

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
  /*   

const checkConnection = async () =>{
   const accessTokenP = fetchAccessTokenP(userId);

   console.log(accessTokenP);
   if(accessTokenP== undefined ){
    setConnection('red');
    } else{
    setConnection('green');
   }

} */

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

  const [visibility, setVisibility] = useState(false);

  const [id, setUserId] = useState('3');

  const showEditView = async () => {
    var userInfo = await fetchUserInfo(id);

    setFirstname(userInfo.fname);
    setLastname(userInfo.lname);
    setGender(userInfo.gender);
    setAge(userInfo.age);
    setVisibility(true);
  };

  const updateUser = async () => {
    var userInfo = await fetchUserInfo(id);
    console.log('paskakulli' + userInfo);
    updateUserInfo(firstname, lastname, gender, age, id);
    setVisibility(false);
  };

  const cancel = () => {
    setVisibility(false);
    
  };

  return (
    <View>
      <View style={styles.image}>
            <Image
              style={{width: 120, height: 120, borderRadius: 75}}
              source={{uri: filePathh}}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
          </View>
      <View>
        <View style={styles.container}></View>
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
        <Pressable style={styles.buttonEdit} onPress={() => showEditView()}>
          <Text style={styles.buttonTextEdit}>Edit Your Profile</Text>
        </Pressable>
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
                onPress={() => setSleepChecked('sleeppolar')}
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
                onPress={() => setSleepChecked('sleepfit')}
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
      <Modal visible={visibility} animationType="slide">
        <View>
          <Text style={styles.text}>Edit Your Profile Information</Text>
        </View>

        <View style={styles.editView}>
          <View style={styles.image}>
            <Image
              style={{width: 120, height: 120, borderRadius: 75}}
              source={{uri: filePathh}}
              resizeMode={'cover'} // cover or contain its upto you view look
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => captureImage('photo')}>
            <Text style={styles.info}> Take a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => chooseFile('photo')}>
            <Text style={styles.info}> Choose Image</Text>
          </TouchableOpacity>

          <Text style={styles.headers}>Firstname</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Firstname"
            autoCapitalize="none"
            value={firstname}
            onChangeText={setFirstname}
          />
          <Text style={styles.headers}>Lastname</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Lastname"
            autoCapitalize="none"
            value={lastname}
            onChangeText={setLastname}
          />
          <Text style={styles.headers}>Gender</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Gender"
            autoCapitalize="none"
            value={gender}
            onChangeText={setGender}
          />
          <Text style={styles.headers}>Age</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Age"
            autoCapitalize="none"
            value={age}
            onChangeText={setAge}
          />
          <View style={styles.sharecont}>
            <Pressable style={styles.buttonCancel} onPress={cancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={styles.sharecont}>
            <Pressable style={styles.buttonUpdate} onPress={() => updateUser()}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacont: {
    marginVertical: 350,
    alignContent: 'flex-start',
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

  editView: {
    marginLeft: 25,
    marginRight: 25,
    height: 40,
  },
  input: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 30,
    height: 40,
    borderColor: '#E6E6FA',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
  headers: {
    marginLeft: 25,
    fontSize: 11,
    letterSpacing: 1,
  },
  text: {
    marginTop: 25,
    marginBottom: 25,
    height: 40,
    textAlign: 'center',
    fontSize: 19,
    letterSpacing: 1,
  },
  buttonCancel: {
    alignSelf: 'center',
    height: 30,
    width: 150,
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    letterSpacing: 2,
    borderColor: '#E6E6FA',
    borderWidth: 1,
  },
  buttonUpdate: {
    alignSelf: 'center',
    height: 30,
    width: 150,
    borderRadius: 5,
    letterSpacing: 2,
    borderColor: '#E6E6FA',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 13,
    color: '#696969',
    alignSelf: 'center',
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderColor: '#696969',
  },
  buttonTextEdit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#696969',
    alignSelf: 'center',
  },
  buttonEdit: {
    color: 'black',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#696969',
  },
  image: {
    alignItems: 'center',
    marginHorizontal: 20,
  },

  sharecont: {
    alignItems: 'center',
    marginVertical: 6,
  },

  sharebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#1e90ff',
    width: 10,
    height: 10,
  },
  sharetext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Userprofile;
