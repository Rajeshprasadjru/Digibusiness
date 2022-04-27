import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Dimensions,Linking,Share} from 'react-native';
import { Icon } from 'native-base';

import database from '@react-native-firebase/database';

import { firebase } from '@react-native-firebase/auth';

import BlinkView from 'react-native-smooth-blink-view';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import YoutubePlayer from "react-native-youtube-iframe";

import SwiperFlatList from 'react-native-swiper-flatlist';

import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

export default class Mycard extends Component {


   constructor(props) {
      super(props);
      this.state = {
         result: [],
         image: [],
         playing: false,
         vid: [],

         vname: '',

         v_mobile:'',

         address:'',

         vtimetable:'',

         vmobile:'',

         vmobilee:'',

         v_landline:'',

         v_email:'',

         v_website:'',

         v_about:'',

      }
   }
   componentDidMount() {

      this.setState({
         result: []
      })
    try{
      this._unsubscribe = this.props.navigation.addListener('focus', () => {

         this.setState({
            result: []
         })
         database().ref('Place').once('value', (snap) => {

            snap.forEach((child) => {
               let item = child.val();
               item.id = child.key;
               // let catt= this.state.place
                console.log("place", item.c_name);

               var ref = database().ref('Business').child(item.c_name);
               this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    console.log("uuuuuu", user._user.uid);
                  // this.setState({userid:user._user.uid});
                  var query = ref.orderByChild('user_id').equalTo(user._user.uid);
                  //console.log("mera query ra",query);
                  query.once("value", (snapshot)=> {
                     // console.log("snapshot m ra",snapshot);
                     // console.log("result",snapshot.val()); 
                     snapshot.forEach((child) => {
                       // console.log("kya aaya h mera data", child.val());
                        let item = child.val();
                        console.log("item data", item);
                        console.log("item data", item.id);
                        console.log("item data", item.v_about);
                        this.setState({
                           v_about: item.v_about,
                           v_email: item.v_email,
                           v_mobile: item.v_mobile,
                           v_landline: item.v_landline,
                           v_latitute: item.v_latitute,
                           v_longitude: item.v_longitude,
                           v_website: item.v_website,
                           v_whatsapp: item.v_whatsapp,
                           address: item.v_address,
                           result: item,
                          // image:item.multiphoto
                        });

                var url = this.state.result.v_service;
                var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {
                    console.log("video id = ", videoid[1]);
                    this.setState({vid:videoid[1]})
                } else {
                    console.log("The youtube url is not valid.");
                }
                        console.log("tell me", this.state.v_about);
                        console.log("tell me", this.state.result);
                        console.log("tell me1", this.state.result.multiphoto);
                        var keys = Object.keys(this.state.result.multiphoto);
                            console.log(keys) // ['alpha', 'beta'] 
                        keys.forEach((child) => {
                           // console.log(child);
                           let item = this.state.result.multiphoto[child];
                           console.log("image data", item);
                           let rr = this.state.image;
                           rr.push(item);
                           this.setState({
                               image: rr
                           })
       
       
                       })
                        // AsyncStorage.setItem('item', JSON.stringify(item.v_name))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));

                        
                        // AsyncStorage.setItem('item1', JSON.stringify(item.v_mobile))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));   


                        // AsyncStorage.setItem('item2', JSON.stringify(item.v_address))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));   


                        // AsyncStorage.setItem('item3', JSON.stringify(item.v_time_table))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));     


                        // AsyncStorage.setItem('item4', JSON.stringify(item.v_mobile))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));      


                        // AsyncStorage.setItem('item5', JSON.stringify(item.v_mobile_))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));
                           
                        // AsyncStorage.setItem('item6', JSON.stringify(item.v_landline))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));   
                           
                        //    AsyncStorage.setItem('item7', JSON.stringify(item.v_email))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));     
                         
                        //    AsyncStorage.setItem('item8', JSON.stringify(item.v_website))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));   


                        //    AsyncStorage.setItem('item9', JSON.stringify(item.v_about))
                        //    .then(json => console.log('success!'))
                        //    .catch(error => console.log('error!'));   
                              
                        // let rr= this.state.result;
                        // rr.push({item});
                        // this.setState({
                        //     result:rr
                        // })

                     });




                  });

                  console.log("tell me1", this.state.result);
                  database().ref('Business').child(item.c_name).child(this.state.result.id).child('multiphoto').once('value', (snap) => {

                     // this.setState({
                     //     result: snap.val()
                     // })
                      console.log("imageee", snap.val());
     
                     snap.forEach((child) => {
                         // console.log(child);
                         let item = child.val();
                         console.log("image data", item);
                         let rr = this.state.image;
                         rr.push(child.val());
                         this.setState({
                             image: rr
                         })
     
     
                     })
                     console.log("image list", this.state.image);
     
     
                 })   
                


               })
            

            //    database().ref('Business').child('DELHI').child('hllfUqwDcxPZtNmm9rn2YH6LEoo1').child('multiphoto').once('value', (snap) => {

            //       // this.setState({
            //       //     result: snap.val()
            //       // })
            //        console.log("imageee", snap.val());

            //       snap.forEach((child) => {
            //           // console.log(child);
            //          //  let item = child.val();
            //           //console.log("image data", item);
            //           let rr = this.state.image;
            //           rr.push(child.val());
            //           this.setState({
            //               image: rr
            //           })


            //       })
            //      console.log("image list", this.state.image);


            //   })

               //   snap.forEach((child) => {
               //   let item = child.val();
               //   console.log("place data",item);

               //   if(item.v_category === this.props.route.params.item){
               //       let rr= this.state.result;
               //       rr.push({item});
               //       this.setState({
               //           result:rr
               //       })
               //    }

               //   })


               // })

               //   catt.push(item.c_name)
               //   cat.push({
               //      c_id: child.val().c_id,
               //      c_name: child.val().c_name,
               //      img_path: child.val().img_path,
               //   });
               //   this.setState({
               //      category:catt
               //   })
               //   console.log("item value",item.c_name);
            });

            // console.log("rrrrrrrr", this.state.result);
         });

        

      })
    } catch(error){

    }
     
   }

   onShare = async () => {
      // console.log('dsfcgvbhjnkm');
      //alert("cdvbnsm");
      try {
         const result = await Share.share({
            message:
               //'React Native | A framework for building native apps using React',
               'मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ' + 'https://btob-372db.firebaseapp.com/index.html?id=' + this.state.result.id + '&locations=' + this.state.result.v_location,
         });

         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            }
         } else if (result.action === Share.dismissedAction) {
            // dismissed
         }
      } catch (error) {
         alert(error.message);
      }
   };

   onStateChange = () => {
      if (state === "ended") {
         this.setState({
            playing: false
         })
         Alert.alert("video has finished playing!");
      }
   }

   togglePlaying = () => {
      // setPlaying((prev) => !prev);
   }
   render() {
      // AsyncStorage.getItem('item').then((value) => {
            
      //    this.setState({vname:value.replace(/['"]+/g, '')});       
      // })

      // AsyncStorage.getItem('item1').then((value) => {
            
      //    this.setState({v_mobile:value});
      // })

      // AsyncStorage.getItem('item2').then((value) => {
            
      //    this.setState({address:value.replace(/['"]+/g, '')});
      // })

      // AsyncStorage.getItem('item3').then((value) => {
            
      //    this.setState({vtimetable:value.replace(/['"]+/g, '')});
      // })

      // AsyncStorage.getItem('item4').then((value) => {
            
      //    this.setState({vmobile:value.replace(/['"]+/g, '')});
      // })


      // AsyncStorage.getItem('item5').then((value) => {
            
      //    this.setState({vmobilee:value.replace(/['"]+/g, '')});
      // })


      // AsyncStorage.getItem('item6').then((value) => {
            
      //    this.setState({v_landline:value.replace(/['"]+/g, '')});
      // })

      // AsyncStorage.getItem('item7').then((value) => {
            
      //    this.setState({v_email:value.replace(/['"]+/g, '')});
      // })

      // AsyncStorage.getItem('item8').then((value) => {
            
      //    this.setState({v_website:value.replace(/['"]+/g, '')});
      // })

      // AsyncStorage.getItem('item9').then((value) => {
            
      //    this.setState({v_about:value.replace(/['"]+/g, '')});
      // })

      
      return (
         <SafeAreaView>
            {this.state.result?
            <ScrollView horizontal={false}>
            <View>
               <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Icon
                     onPress={() => 
                        {
                          // alert('test')
                           this.props.navigation.navigate('Home')
                        }
                  }
                     name="md-arrow-back-sharp"
                     style={{ fontSize: 30 }} />

                  <Image
                     resizeMode="contain"
                     style={{ flex: 1, height: 40 }}
                     source={require('../assets/digibusiness.png')}
                  />

               </View>

               <SwiperFlatList
                  autoplay
                  autoplayDelay={2}
                  autoplayLoop
                  data={this.state.image}

                  renderItem={({ item }) => (
                     <View style={{ flex: 1, width: width, height: width / 3 }}>
                        <Image
                           style={{ flex: 1, height: width / 1.8, resizeMode: 'stretch', borderRadius: 10, borderColor: 'grey', borderWidth: 0.5, margin: 10 }}
                           source={{ uri: item.image_path }}
                        />
                     </View>

                  )}

               />

               <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10 }}>{this.state.result.v_name}</Text>

               <Text style={{ marginStart: 10 }}>{this.state.result.v_location}</Text>

               <View style={{ flexDirection: 'row', margin: 20 }}>
                  <TouchableWithoutFeedback onPress={() => Linking
                     .openURL("tel:" + this.state.v_mobile)
                     .catch(err => console.error('Error', err))}
                  >
                     <Image
                        resizeMode={'contain'}
                        style={{ width: '20%', height: 40, flex: 1 }}
                        source={require('../assets/telephone_.png')}
                     />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => Linking
                     .openURL("http://api.whatsapp.com/send?phone=" + "91" + this.state.result.v_whatsapp + "&text" + "मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ")
                     .catch(err => console.error('Error', err))}
                  >
                     <Image
                        resizeMode={'contain'}
                        style={{ width: '20%', height: 40, flex: 1 }}
                        source={require('../assets/whatsapp_.png')}
                     />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => Linking
                     .openURL("http://maps.google.com/maps?daddr=" + this.state.result.v_latitute + "," + this.state.result.v_longitude + "")
                     .catch(err => console.error('Error', err))}
                  >
                     <Image
                        resizeMode={'contain'}
                        style={{ width: '20%', height: 40, flex: 1 }}
                        source={require('../assets/placeholder.png')}
                     />
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => this.onShare()}
                  >
                     <Image
                        resizeMode={'contain'}
                        style={{ width: '20%', height: 40, flex: 1 }}
                        source={require('../assets/next.png')}
                     />
                  </TouchableWithoutFeedback>
               </View>

               <Text style={{ marginStart: 10, fontWeight: 'bold' }}>Photos</Text>

               <View style={{ borderColor: 'grey', borderWidth: 1 }}>
                  <ScrollView horizontal={true}>
                     {this.state.image.map((data) => {
                        return (
                           <View style={{ flex: 1 }}>
                              <Image

                                 style={{ width: 100, height: 100, flex: 1, margin: 5 }}
                                 source={{ uri: data.image_path }}
                              />
                           </View>
                        )
                     })

                     }
                  </ScrollView>
                  {/* <Image
                      resizeMode={'contain'}
                      style={{ width: '30%', height: 100, flex: 1, margin: 5 }}
                      source={require('../assets/ro.jpeg')}
                  />

                  <Image
                      resizeMode={'contain'}
                      style={{ width: '30%', height: 100, flex: 1, margin: 5 }}
                      source={require('../assets/ro.jpeg')}
                  />

                  <Image
                      resizeMode={'contain'}
                      style={{ width: '30%', height: 100, flex: 1, margin: 5 }}
                      source={require('../assets/ro.jpeg')}
                  /> */}

               </View>

               <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Icon
                     name='md-location'
                     style={{ color: 'grey' }}
                  />
                  <Text numberOfLines={2} style={{ marginStart: 5,marginEnd:5 }}>{this.state.address}</Text>

               </View>

               <View style={{ borderColor: 'grey', borderWidth: 1 }}>
                  <View style={{ margin: 10, flexDirection: 'row' }}>
                     <Icon
                        name='md-warning-outline'
                        style={{ color: 'grey' }}
                     />
                     <Text style={{ margin: 5 }}>Hours and Services May Differs</Text>


                  </View>
               </View>

               <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Icon
                     name='md-time'
                     style={{ color: 'grey' }}
                  />
                  <Text style={{ margin: 5 }}>{this.state.result.v_time_table}</Text>

               </View>

               <View style={{ borderColor: 'grey', borderWidth: 1 }}>
                  <View style={{ margin: 10, flexDirection: 'row' }}>
                     <Icon
                        name='md-call'
                        style={{ color: 'grey', fontSize: 22 }}
                     />
                     <Text style={{ margin: 5 }}>+91-{this.state.result.v_mobile}</Text>


                  </View>
               </View>

               <View style={{ margin: 10, flexDirection: 'row' }}>
                  <Icon
                     name='md-call'
                     style={{ color: 'grey', fontSize: 22 }}
                  />
                  <Text style={{ margin: 5 }}>+91-{this.state.result.v_mobile_}</Text>


               </View>

               <View style={{ borderColor: 'grey', borderWidth: 1 }}>

                  <View style={{ margin: 10, flexDirection: 'row' }}>
                     <Icon
                        name='md-call'
                        style={{ color: 'grey', fontSize: 22 }}
                     />
                     <Text style={{ margin: 5 }}>{this.state.result.v_landline}</Text>


                  </View>

               </View>
               <View style={{ margin: 10 }}>
                     <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Icon
                           name='md-mail-sharp'
                           style={{ color: 'grey', fontSize: 22 }}
                        />
                        <Text style={{ margin: 5, flex: 1 }}>{this.state.result.v_email}</Text>

                        <Icons
                           style={{ color: 'black', fontSize: 22 }}
                           name='cursor-pointer'
                        />
                     </View>




                  </View>
                  <View style={{ borderColor: 'grey', borderWidth: 1 }}>
                     <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                        <Icon
                           name='md-globe-sharp'
                           style={{ color: 'grey', fontSize: 22 }}
                        />
                        <Text style={{ margin: 5, flex: 1 }}>{this.state.result.v_website}</Text>

                        <Icons
                           style={{ color: 'black', fontSize: 22 }}
                           name='cursor-pointer'
                        />
                     </View>

                  </View>
               {/* <BlinkView
                  delayVisible={300}
                  delayInvisible={0}
                  duration={500}
                  blinking>
                 
               </BlinkView>
               <BlinkView
                  delayVisible={300}
                  delayInvisible={0}
                  duration={500}
                  blinking>
                

               </BlinkView> */}

               <Text style={{ marginStart: 10, color: 'black', fontWeight: 'bold' }}>About us</Text>

               <Text style={{ marginStart: 10, marginEnd: 10, color: 'black' }}>
                  {this.state.result.v_about}
               </Text>


               <View style={{ borderColor: 'grey', borderWidth: 1, height: Dimensions.get("window").width / 2 }}>
                  <MapView
                     onPress={() => Linking
                        .openURL("http://maps.google.com/maps?daddr=" + this.state.result.v_latitute + "," + this.state.result.v_longitude + "")
                        .catch(err => console.error('Error', err))}
                     style={styles.map}
                     initialRegion={{
                        latitude: this.state.result.v_latitute,
                        longitude: this.state.result.v_longitude,

                     }}
                     zoomEnabled={true}
                     minZoomLevel={10}
                  >
                     <Marker coordinate={{
                        latitude: this.state.result.v_latitute,
                        longitude: this.state.result.v_longitude,
                     }} />
                  </MapView>
                  {/* <Image
                      style={{ height: 200, width: '100%' }}
                      source={require('../assets/map.png')}
                  /> */}

               </View>


               {this.state.result.v_service != null ?

                  <View style={{ marginTop: 20 }}>
                     <YoutubePlayer
                        height={300}
                        play={this.state.playing}
                        videoId={this.state.vid}
                        onChangeState={this.onStateChange}
                     />
                     {/* <Button title={playing ? "pause" : "play"} onPress={this.togglePlaying} /> */}
                  </View>

                  : null}



            </View>

         </ScrollView>

            :
            <SafeAreaView>
                               <View style={{ flexDirection: 'row', margin: 5 }}>
                                  <Icon
                                    onPress={() => this.props.navigation.navigate('Home')}
                                    name="md-arrow-back-sharp"
                                    style={{ fontSize: 30 }} />
            
                                 <Image
                                    resizeMode="contain"
                                    style={{ flex: 1, height: 40 }}
                                    source={require('../assets/digibusiness.png')}
                                 />
            
                              </View>
            
                              <Text style={{alignContent:'center',justifyContent:'center',alignSelf:'center',color:'grey'}}>No card available</Text>
                              </SafeAreaView>
            }
            
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


// import React from 'react';
// import { StyleSheet, Text, View,Image, SafeAreaView} from 'react-native';

// import { Icon } from 'native-base';

// export default class App extends React.Component {
//    render() {
//       return (
//          <SafeAreaView>
//                   <View style={{ flexDirection: 'row', margin: 5 }}>
//                       <Icon
//                         onPress={() => this.props.navigation.navigate('Home')}
//                         name="md-arrow-back-sharp"
//                         style={{ fontSize: 30 }} />

//                      <Image
//                         resizeMode="contain"
//                         style={{ flex: 1, height: 40 }}
//                         source={require('../assets/digibusiness.png')}
//                      />

//                   </View>

//                   <Text style={{alignContent:'center',justifyContent:'center',alignSelf:'center',color:'grey'}}>No card available</Text>
//                   </SafeAreaView>
//       );
//    }
// }

// const styles = StyleSheet.create({
//    container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//    },
// });


