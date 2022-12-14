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
  ActivityIndicator,
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
  const [id, setUserId] = useState('1');

  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [doc, setDoc] = useState('1');
  const kuka = [
    {label: 'Sampo', value: '1'},
    {label: 'Jere', value: '2'},
    {label: 'Janette', value: '3'},
    {label: 'Laura', value: '4'},
  ];

  useEffect(() => {
    const setUserInfo = async () => {
      var userInfo = await fetchUserInfo(id);
      setFirstname(userInfo.fname);
      setLastname(userInfo.lname);
      setGender(userInfo.gender);
      setAge(userInfo.age);
    
    };

    setUserInfo();
  }, [id]);

  //fetchUserInfo(id);

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
  

  useEffect(() => {
    const checkPrefSleep = async () => {
      var preference = await fetchSleepPreference(id);

      switch (preference) {
        case 'Polar':
          setSleepChecked('sleeppolar');
          break;

        case 'Fitbit':
          setSleepChecked('sleepfit');
          break;
      }
    };

    const checkPrefSteps = async () => {
      var preference = await fetchStepPreference(id);

      switch (preference) {
        case 'Polar':
          setStepsChecked('stepspolar');
          break;

        case 'Fitbit':
          setStepsChecked('stepsfit');
          break;
      }
    };

    const checkPrefCals = async () => {
      var preference = await fetchCaloriesPreference(id);

      switch (preference) {
        case 'Polar':
          setCalsChecked('calspolar');
          break;

        case 'Fitbit':
          setCalsChecked('calsfit');
          break;
      }
      setLoading(false);
    };

    checkPrefSleep();
    checkPrefSteps();
    checkPrefCals();
  }, []);
  const setSleep = async () => {
    var preference = await fetchSleepPreference(id);
    switch (preference) {
      case 'Polar':
        var sleep = 'Fitbit';
        await setSleepPreference(doc, sleep);
        setSleepChecked('sleepfit');
        break;

      case 'Fitbit':
        var sleep = 'Polar';
        await setSleepPreference(doc, sleep);
        setSleepChecked('sleeppolar');
        break;
    }
  };

  const setSteps = async () => {
    var preference = await fetchStepPreference(id);
    switch (preference) {
      case 'Polar':
        var steps = 'Fitbit';
        await setStepsPreference(doc, steps);
        setStepsChecked('stepsfit');
        break;

      case 'Fitbit':
        var steps = 'Polar';
        await setStepsPreference(doc, steps);
        setStepsChecked('stepspolar');
        break;
    }
  };

  const setCals = async () => {
    var preference = await fetchCaloriesPreference(id);
    switch (preference) {
      case 'Polar':
        var cals = 'Fitbit';
        await setCaloriesPreference(doc, cals);
        setCalsChecked('calsfit');
        break;

      case 'Fitbit':
        var cals = 'Polar';
        await setCaloriesPreference(doc, cals);
        setCalsChecked('calspolar');
        break;
    }
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
        });
    });
  };

  const [visibility, setVisibility] = useState(false);

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
    updateUserInfo(firstname, lastname, gender, age, id);
    setVisibility(false);
  };

  const cancel = () => {
    setVisibility(false);
  };

  return (
    <View>
      <SwitchSelector
        options={kuka}
        initial={0}
        onPress={value => setUserId(value)}
        selectedColor={'white'}
        buttonColor={'#483d8b'}
      />
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

          <Pressable style={styles.buttonEdit} onPress={() => showEditView()}>
            <Text style={styles.buttonTextEdit}>Edit Your Profile</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.datacont}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={{fontSize: 16}}>
              Service
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 16}}>Sleep</DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 16}}>Steps</DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 16}}>
              Calories
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.cell}>
            <DataTable.Cell>POLAR</DataTable.Cell>

            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    style={styles.radio}
                    value="sleeppolar"
                    status={
                      Sleepchecked === 'sleeppolar' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setSleep()}
                  />
                </View>
              )}
            </DataTable.Cell>
            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    value="stepspolar"
                    status={
                      Stepschecked === 'stepspolar' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setSteps()}
                  />
                </View>
              )}
            </DataTable.Cell>
            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    value="calspolar"
                    status={
                      Calschecked === 'calspolar' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setCals()}
                  />
                </View>
              )}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>FITBIT</DataTable.Cell>
            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    value="sleepfit"
                    status={
                      Sleepchecked === 'sleepfit' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setSleep()}
                  />
                </View>
              )}
            </DataTable.Cell>
            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    value="stepsfit"
                    status={
                      Stepschecked === 'stepsfit' ? 'checked' : 'unchecked'
                    }
                    onPress={() => setSteps()}
                  />
                </View>
              )}
            </DataTable.Cell>
            <DataTable.Cell>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View>
                  <RadioButton
                    value="calsfit"
                    status={Calschecked === 'calsfit' ? 'checked' : 'unchecked'}
                    onPress={() => setCals()}
                  />
                </View>
              )}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <Modal visible={visibility} animationType="slide">
        <View>
          <Text style={styles.text}>Edit Your Profile Information</Text>
        </View>

        <View style={styles.image}>
          <Image
            style={{width: 120, height: 120, borderRadius: 75, margin: -70}}
            source={{uri: filePathh}}
            resizeMode={'cover'} // cover or contain its upto you view look
          />
        </View>
        <View style={styles.photobuttons}>
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
        </View>

        <View style={styles.editView}>
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

  photobuttons: {
    marginVertical: 30,
  },

  radio: {
    color: 'black',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  infocont: {
    marginVertical: 50,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacont: {
    marginVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
    width: 450,
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 15,
  },
  editView: {
    marginLeft: 25,
    marginRight: 25,
    height: 40,
    marginVertical: 0,
  },
  input: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 4,
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
    marginTop: 40,
    marginVertical: 20,
  },

  cell: {
    marginVertical: 20,
  },
});
export default Userprofile;
