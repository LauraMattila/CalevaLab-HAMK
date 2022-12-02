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
          <DataTable.Cell>Week 7</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[6]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[6]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[6]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week 6</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[5]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[5]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[5]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week 5</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[4]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[4]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[4]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week 4</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[3]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[3]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[3]}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Week 3</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[2]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[2]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[2]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week 2</DataTable.Cell>
          <DataTable.Cell numeric>{props.sleep[1]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.steps[1]}</DataTable.Cell>
          <DataTable.Cell numeric>{props.calories[1]}</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Week 1</DataTable.Cell>
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
  