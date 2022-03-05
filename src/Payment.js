import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,Dimensions,Image} from 'react-native';
const { width ,height} = Dimensions.get('window');
export default class Payment extends React.Component {
   render() {
      return (
         <SafeAreaView>
             <View>
             <Image
                  resizeMode='stretch'
                  style={{height:height,width:width}}
                  source={require('../assets/digibusinesspayment.jpeg')}
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