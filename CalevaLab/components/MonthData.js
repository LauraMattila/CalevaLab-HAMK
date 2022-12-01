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
const MonthData = () =>{

    return(
      

        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Month</DataTable.Title>
          <DataTable.Title numeric>Sleep</DataTable.Title>
          <DataTable.Title numeric>Steps</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Month 7</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Month 6</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Month 5</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Month 4</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Month 3</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Month 2</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
        </DataTable.Row>


        <DataTable.Row>
          <DataTable.Cell>Month 1</DataTable.Cell>
          <DataTable.Cell numeric>Koira </DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
          <DataTable.Cell numeric>Koira</DataTable.Cell>
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
  
  export default MonthData;
  