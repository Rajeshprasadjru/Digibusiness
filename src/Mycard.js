import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';
import { Icon } from 'native-base';

export default class Mycard extends React.Component {
   render() {
      return (
       <SafeAreaView>
           <View style={{ flexDirection: 'row', margin: 5 }}>
               <Icon
                  onPress={() => this.props.navigation.navigate('Home')}
                  name="md-arrow-back-sharp"
                  style={{fontSize: 30 }} />

               <Image
                  resizeMode="contain"
                  style={{ flex: 1, height: 40 }}
                  source={require('../assets/digibusiness.png')}
               />

            </View>

            
       </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});


