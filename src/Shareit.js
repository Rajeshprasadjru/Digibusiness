import React from 'react';
import { StyleSheet, Text, View,Share } from 'react-native';

export default class Shareit extends React.Component {
    componentDidMount(){
        this.onShare();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.onShare();
        })
    }

    onShare = async () => {
        // console.log('dsfcgvbhjnkm');
        //alert("cdvbnsm");
        try {
            const result = await Share.share({
                message:
                    //'React Native | A framework for building native apps using React',
                    'मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ' + 'https://btob-372db.firebaseapp.com/digibusiness.html',
            });
  
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                    this.props.navigation.navigate('Home')
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                this.props.navigation.navigate('Home')
            }
        } catch (error) {
            alert(error.message);
        }
    };
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