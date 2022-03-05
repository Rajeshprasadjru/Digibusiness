import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';

import { Icon } from 'native-base';

import database from '@react-native-firebase/database';

export default class AboutUs extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         text:[],
      }
   }

   componentDidMount(){
      var items = [];
      database().ref('Aboutus').once('value', (snap) => {

         snap.forEach((child) => {
            let item = child.val();
            item.id = child.key;
            console.log("hhhhhhh",item);
            // items.push({
            //    data: child.val().data
            // });
            this.setState({
               text: item
            })

         });
         // console.log("ssss",items)   
         


         console.log("txttxtxtx", this.state.text);
      });

   }
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

            <View style={{margin:20}}>
                <Text>{this.state.text}</Text>
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