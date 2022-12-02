import React, {useState, useEffect, Component} from 'react';

import {StyleSheet, Text, View, Pressable, Modal, Button, TextInput, TouchableOpacity} from 'react-native';

import {fetchUserInfo, SaveUserInfo, updateUserInfo} from '../db/UserDb';

//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {RadioButton} from 'react-native-paper';

const Userprofile = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [Sleepchecked, setSleepChecked] = React.useState('sleepfit');
  const [Stepschecked, setStepsChecked] = React.useState('stepsfit');
  const [Calschecked, setCalsChecked] = React.useState('calsfit');

  const [visibility, setVisibility] = useState(false);

  const [id, setUserId] = useState('2')


  const showEditView = async() => {
    var userInfo = await fetchUserInfo(id);
    setFirstname(userInfo.fname);
    setLastname(userInfo.lname);
    setGender(userInfo.gender);
    setAge(userInfo.age);
    setVisibility(true);
  }

  const updateUser = async() => {
    var userInfo = await fetchUserInfo(id);
    console.log('paskakulli' + userInfo);
    updateUserInfo(firstname, lastname, gender, age, id);
    setVisibility(false);

  }

  const cancel = () => {
    setVisibility(false);
  }

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
      <Pressable style={styles.buttonEdit}
          onPress = {() => showEditView()}>
          <Text style={styles.buttonTextEdit}>Edit Your Profile</Text>
        </Pressable>
      
      
        
      
    
    <Modal visible={visibility} animationType='slide'>
      <View>
        <Text style={styles.text}>
          Edit Your Profile Information
        </Text>
      </View>

      <View style={styles.editView}>
      <Text style={styles.headers}>
        Firstname
      </Text>
      <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Firstname"
            autoCapitalize = "none"
            value = {firstname}
            onChangeText = {setFirstname}
      />
      <Text style={styles.headers}>
        Lastname
      </Text>      
      <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Lastname"
            autoCapitalize = "none"
            value = {lastname}
            onChangeText = {setLastname}
            
      />
      <Text style={styles.headers}>
        Gender
      </Text>
      <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Gender"
            autoCapitalize = "none"
            value = {gender}
            onChangeText = {setGender}
           
      />
      <Text style={styles.headers}>
        Age
      </Text>
      <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Age"
            autoCapitalize = "none"
            value = {age}
            onChangeText = {setAge}
      />
        <View style={styles.sharecont}>
        <Pressable style={styles.buttonCancel}
          onPress= {cancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        </View>

        <View style={styles.sharecont}>
        <Pressable style={styles.buttonUpdate}
          onPress = {() => updateUser()}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
        </View>
      </View>
    </Modal>

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
    </View>
  );
};
const styles = StyleSheet.create({
  infocont: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datacont: {
    marginVertical: 350,
    alignContent: 'flex-start' 
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
    backgroundColor: '#F5F5F5'
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
    color: "#696969",
    alignSelf: "center",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderColor: '#696969'   
  },
  buttonTextEdit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "#696969",
    alignSelf: "center",
  },
  buttonEdit: {
    color: "black",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#696969"
    

  },
 
});
export default Userprofile;
