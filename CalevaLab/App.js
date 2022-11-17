import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Appbar, TextInput, Button} from 'react-native-paper';

const App: () => Node = () => {
    const [user, setUser] = useState('');
    const ref = firestore().collection('users');
    const [summary, setSummary] = useState();
    const [sleep, setSleep] = useState();
    const [users, setUsers] = useState([]);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {fname, lname} = doc.data();
            list.push({
              id: doc.id,
              fname,
              lname,
             
            });
          });
    
          setUsers(list);
    
          if (loading) {
            setLoading(false);
          }
        });
      }, []);


  return (
        <View style={styles.container}>
          <Text>Hello ICT-project!</Text>



          <FlatList
        style={{flex: 1}}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View>
            <Text>
              {' '}
              {item.item.id} {item.item.fname} {item.item.lname}{' '}
             
            </Text>
          </View>
        )}
      />
        </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

export default App;