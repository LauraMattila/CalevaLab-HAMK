import {DataTable} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Button,
    Pressable,
  } from 'react-native';

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
const WeekData = (props) =>{

    return(
      

        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Week</DataTable.Title>
          <DataTable.Title numeric>Sleep</DataTable.Title>
          <DataTable.Title numeric>Steps</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[6]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[6]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[6]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-1}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[5]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[5]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[5]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-2}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[4]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[4]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[4]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-3}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[3]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[3]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[3]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-4}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[2]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[2]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[2]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-5}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[1]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[1]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[1]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week {date.getWeek()-6}</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[0]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[0]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[0]}</DataTable.Cell>
        </DataTable.Row>
        </DataTable>


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
  
  export default WeekData;
  