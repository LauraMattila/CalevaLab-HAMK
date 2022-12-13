import React, {useState, useEffect} from 'react';
//import Icon from 'react-native-vector-icons/AntDesign';
import SwitchSelector from 'react-native-switch-selector';
import {Provider as PaperProvider, Title} from 'react-native-paper';
import {DataTable} from 'react-native-paper';
import Moment from 'moment';

import {StyleSheet, Text, View, Pressable} from 'react-native';

import firestore from '@react-native-firebase/firestore';







const WeekDataCard = props => {
  var date = new Date();

  Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
      1 +
      Math.round(
        ((date.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  };

  return (
    
      
        <DataTable>
          <DataTable.Header style={styles.weekdays}>
            <DataTable.Title></DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek()-6}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() - 5}{' '}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() - 4}{' '}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() - 3}{' '}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() - 2}{' '}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() - 1}{' '}
            </DataTable.Title>
            <DataTable.Title textStyle={{fontSize: 10}} numeric>
              Week {date.getWeek() }{' '}
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.row}>
            <DataTable.Cell>STEPS</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[0]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[1]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[2]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[3]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[4]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[5]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.steps[6]}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row style={styles.row}>
            <DataTable.Cell>KCAL</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[0]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[1]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[2]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[3]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[4]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[5]}</DataTable.Cell>
            <DataTable.Cell numeric>{props.calories[6]}</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row style={styles.row}>
            <DataTable.Cell>SLEEP</DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[0]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[1]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[2]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[3]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[4]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[5]}
            </DataTable.Cell>
            <DataTable.Cell textStyle={{fontSize: 13}} numeric>
              {' '}
              {props.sleep[6]}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      

  );
};

const styles = StyleSheet.create({
    infocont: {
        marginVertical: 20,
        flexDirection: 'row',
        height: 70,
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
    
      datacont: {
        marginVertical: 40,
      },
    
      selectioncont: {
        flexDirection: 'row',
        marginVertical: 20,
      },
    
      selectionheader: {
        marginVertical: -10,
        width: 150,
      },
    
      selectiontext: {
        fontSize: 20,
        margin: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        marginVertical: 20,
      },
    
      selector: {
        width: 230,
      },
    
      weekdays: {
        marginLeft: -15,
        marginHorizontal: -15,
      },
      row: {
        marginHorizontal: -12,
        marginVertical: 12,
      },
      sharecont: {
        alignItems: 'center',
        marginVertical: -20,
      },
    
      sharebutton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#5f9ea0',
        width: 200,
        height: 75,
        
      },
      sharetext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
});

export default WeekDataCard;
