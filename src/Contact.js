import React from 'react';
import { StyleSheet, Text, View,Linking} from 'react-native';

export default class Contact extends React.Component {
    componentDidMount(){
        Linking
        .openURL("http://api.whatsapp.com/send?phone=" + "919625621052" + "&text" + "मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ")
        .catch(err => console.error('Error', err))
        this.props.navigation.navigate('Home')
    }
   render() {
      return (
         <View style = {styles.container}>
         </View>
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