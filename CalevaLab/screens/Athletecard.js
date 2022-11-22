import * as React from 'react';
import {Button, View, Text,} from 'react-native';

const Athletecard = ({navigation}) => {
  return (
    
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is the Athlete Card!
          </Text>
        </View>
       
      </View>
    
  );
};

export default Athletecard;
