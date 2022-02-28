import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image} from 'react-native';
import { Icon } from 'native-base';

export default class Notifications extends React.Component {
   render() {
      return (
         <SafeAreaView>
            <View>
              <View style={{backgroundColor:'#FF3B30',height:250}}>
              <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Icon
                     onPress={() => this.props.navigation.navigate('Home')}
                     style={{ flex: 1 }}
                     name='md-arrow-back-sharp' />

                  <Icon
                     style={{ color: '#6200EE',fontSize:20}}
                     name='md-pencil-sharp' />

               </View>

            
               <View style={{padding:10}}>
               <View style={{height: 120, width: 120, borderRadius: 60, alignSelf: 'center', bottom: 18}}>
                    <Image
                    source = {{uri:'https://static-media-prod-cdn.itsre-sumo.mozilla.net/static/sumo/img/default-FFA-avatar.png'}}
                    style={{flex:1,justifyContent:'center',alignSelf:'center',height:100,color:'white',width:'100%'}}
                    />
               </View>

               </View> 

              </View>




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