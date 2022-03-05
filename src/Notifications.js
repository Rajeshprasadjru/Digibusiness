import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

export default class Notifications extends React.Component {
   render() {
      return (
         <SafeAreaView>
            <View>
               <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#FF3B30', '#FF9301']}
                  style={{
                     width: width,
                     height: 250
                  }}>

                  <View style={{ flexDirection: 'row', padding: 10 }}>
                     <Icon
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={{ flex: 1 }}
                        name='md-arrow-back-sharp' />

                     <Icon
                        style={{ color: '#2D1EFF', fontSize: 20, magin: 5 }}
                        name='md-pencil-sharp' />

                  </View>


                  <View style={{ padding: 10 }}>
                     <View style={{ height: 120, width: 120, borderRadius: 60, alignSelf: 'center', bottom: 18 }}>
                        <Image
                           source={{ uri: 'https://static-media-prod-cdn.itsre-sumo.mozilla.net/static/sumo/img/default-FFA-avatar.png' }}
                           style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', height: 100, color: 'white', width: '100%' }}
                        />
                     </View>

                  </View>


               </LinearGradient>

               


               <LinearGradient 
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
               colors={['#E8526D', '#C15CF5']}
               style={{ height: 66, width: width / 1.5, backgroundColor: 'red', position: 'absolute', bottom: 0,alignSelf: 'center', top: 220,flexDirection:'row',borderRadius:30}}>

               
                  <View style={{ height: 36, width: 36, borderRadius: 18, borderColor: 'white', borderWidth: 1,backgroundColor:'white',top:20,marginStart:40}}>

                     <Icon
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={{ flex: 1 ,color:'grey'}}
                        name='md-arrow-back-sharp' />
                  </View>

                 <View style={{margin:20,marginLeft:40}}>
                 <Text style={{color:'white'}}>Back to</Text>
                 <Text style={{color:'white'}}>  Home</Text>
                 </View>

               
               </LinearGradient>

               <View style={{flexDirection:'column',top:60}}>
                  <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>Account Info</Text>
                  <View style={{flexDirection:'row',padding:20}}>
                     <Image
                        resizeMode="contain"
                        style={{height: 40 ,width:40}}
                        source={require('../assets/ic_name.png')}
                     />
                     <View style={{flexDirection:'column',margin:5}}> 
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>Name</Text>
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>Sweety</Text>
                     </View>

                  </View>

                  <View style={{flexDirection:'row',paddingLeft:20}}>
                     <Image
                        resizeMode="contain"
                        style={{height: 40 ,width:40}}
                        source={require('../assets/ic_mobile.png')}
                     />
                     <View style={{flexDirection:'column',margin:5}}> 
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>Mobile</Text>
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>8826512919</Text>
                     </View>

                  </View>

                  <View style={{flexDirection:'row',padding:20}}>
                     <Image
                        resizeMode="contain"
                        style={{height: 40 ,width:40}}
                        source={require('../assets/ic_email.png')}
                     />
                     <View style={{flexDirection:'column',margin:5}}> 
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>Email</Text>
                        <Text style={{marginStart:10,color:'black',fontWeight:'bold'}}>ssingh@gmail.com</Text>
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