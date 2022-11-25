import React, {useState, useEffect, Component} from 'react';

import {StyleSheet, Text, View, Pressable} from 'react-native';

//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

const Userprofile = ({navigation}) => {


  const [firstname, setFirstname] = useState('Matti');
  const [lastname, setLastname] = useState('Meikäläinen');
  const [age, setAge] = useState('55');
  const [gender, setGender] = useState('Male');
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
          <DataTable.Title numeric>Sleep</DataTable.Title>
          <DataTable.Title numeric>Steps</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>POLAR</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>FITBIT</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
          <DataTable.Cell numeric>X</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
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
    textAlign:'center',
    marginHorizontal: 20,
    fontSize: 13,
  },

 

});
export default Userprofile;
