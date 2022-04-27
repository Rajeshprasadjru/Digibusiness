import React, { Component } from 'react';
import { Share,SafeAreaView, StyleSheet, Text, View, Image, Dimensions, ScrollView, Button, Linking, TouchableOpacity } from 'react-native';
// import {Icon} from 'native-base';
import { Icon } from 'native-base';

import { SwiperFlatList } from 'react-native-swiper-flatlist';

import database from '@react-native-firebase/database';


import { NavigationContainer } from '@react-navigation/native';
import { ReactNativeFirebase } from '@react-native-firebase/app';

const { width ,height} = Dimensions.get('window');

import { FlatList } from 'react-native-gesture-handler';

import SelectDropdown from 'react-native-select-dropdown';


export default class Home extends Component {

    

   constructor(props) {
      super(props);
      this.state = {
         sliderimg1: [],
         sliderimg2: [],
         countries : ["Egypt", "Canada", "Australia", "Ireland"],
         category: [],
         curl:[],
      }
   }

   renderImage = (item) => {
      console.log("uuuuuu"+item.curls);
      return (
         <TouchableOpacity onPress={() => 
            {
               console.log("item.curls",item.curls);
               if(item.curls!=""){
                  Linking
                  .openURL(item.curls)
                  .catch(err => console.error('Error', err))
               }
               
            }
            }>
         <View style={{ flex: 1, width: width, height: width / 1.8 }}>
            <Image
               style={{ flex: 1, height: width / 1.8, resizeMode: 'stretch', margin: 10 }}
               source={{ uri: item.img_path }}
            />
         </View>
         </TouchableOpacity>
      )

   }



   componentDidMount() {

      // database()
      //    .ref('/Category')
      //    .on('value', snapshot => {
      //       console.log('User data: ', snapshot.val().c_name);
      //    });

      var items = [];
      database().ref('Banner').once('value', (snap) => {

         snap.forEach((child) => {
            let item = child.val();
            console.log("Banner", item);
            item.id = child.key;
            items.push({
               // c_id: child.val().c_id,
               img_path: child.val().img_path,
               curls:child.val().c_name,
            });

         });
         //console.log(items)   
         this.setState({
            sliderimg1: items,
         })


         console.log("yeyeye", this.state.sliderimg1);
      });


      var itemses = [];
      // var values = [];
      database().ref('Poster').once('value', (snap) => {

         snap.forEach((child) => {
            let item = child.val();
            console.log("Poster", item);
            item.id = child.key;
            itemses.push({
               // c_id: child.val().c_id,
               img_path: child.val().img_path,
               curls:child.val().c_name,
               
            });

            // values.push({
            //    curl: child.val().curl,
            // });



         });
         console.log("flatlist", itemses);
         this.setState({
            sliderimg2: itemses,
            // curl:values,
         })


         console.log("yeyeye", this.state.sliderimg2);
         console.log("crllllllll", this.state.curl);
      });


      var cat = [];
      database().ref('Category').once('value', (snap) => {

         snap.forEach((child) => {
            let item = child.val();
            item.id = child.key;
             let catt= this.state.category
            catt.push(item.c_name)
            cat.push({
               c_id: child.val().c_id,
               c_name: child.val().c_name,
               img_path: child.val().img_path,
            });
            this.setState({
               category:catt
            })
            console.log("item value",item.c_name);
         });

         console.log("category name", this.state.category);
      });


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
              }
          } else if (result.action === Share.dismissedAction) {
              // dismissed
          }
      } catch (error) {
          alert(error.message);
      }
  };
   render() {
      return (
         <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', margin: 5 }}>
               <Icon
                  onPress={() => this.props.navigation.openDrawer()}
                  name="md-menu"
                  style={{ color: 'grey', fontSize: 30 }} />

               <Image
                  resizeMode="contain"
                  style={{ flex: 1, height: 40 }}
                  source={require('../assets/digibusiness.png')}
               />

            </View>

            <View style={{ margin: 10}}>
               <SelectDropdown
                  renderDropdownIcon={(isOpened) => {
                     return (
                       <Icon
                         name={isOpened ? "md-chevron-up" : "md-chevron-down"}
                         color={"#444"}
                         size={15}
                       />
                     );
                   }}
                 
                   rowTextStyle={{textAlign:'left'}}
                  defaultButtonText={'Select Category'}
                  buttonStyle={{borderColor: 'grey', borderRadius: 5, borderWidth: 0.5,width:width/1.05}}
                  buttonTextStyle={{textAlign:'left'}}
                  dropdownStyle={{width:width/1.05,height:height/1.8}}
                  data={this.state.category}
                  onSelect={(selectedItem, index) => {
                     console.log(selectedItem, index)
                     this.props.navigation.navigate('Category',{item:selectedItem})
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                     // text represented after item is selected
                     // if data array is an array of objects then return selectedItem.property to render after item is selected
                     return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                     // text represented for each item in dropdown
                     // if data array is an array of objects then return item.property to represent item in dropdown
                     return item
                  }}
               />
               {/* <View
                  style={{ flexDirection: 'row', padding: 20, borderColor: 'grey', borderRadius: 5, borderWidth: 0.5 }}>

                  <Text
                     onPress={() => this.props.navigation.navigate('Category')}
                     style={{ flex: 1, color: 'black', fontWeight: 'bold' }}>Select Category</Text>

                  <Icon
                     name="md-chevron-down"
                     style={{ color: 'grey', fontSize: 20 }} />

               </View> */}

            </View>

            <ScrollView horizontal={false}>
               <View style={{ flex: 1, height: width / 1.8, width: width }}>
                  <SwiperFlatList
                     autoplay
                     autoplayDelay={2}
                     autoplayLoop
                     data={this.state.sliderimg1}

                     renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                           if(item.curls!=""){
                              Linking
                              .openURL(item.curls)
                              .catch(err => console.error('Error', err))
                           }
                           
                        }
                           }>
                        <View style={{ flex: 1, width: width, height: width / 1.8 }}>
                           <Image
                              style={{ flex: 1, height: width / 1.8, resizeMode: 'stretch', borderRadius: 10, borderColor: 'grey', borderWidth: 0.5, margin: 10 }}
                              source={{ uri: item.img_path }}
                           />
                        </View>
                        </TouchableOpacity>

                     )}

                  />
               </View>


               <FlatList
                  horizontal={false}
                  index={0}
                  data={this.state.sliderimg2}

                  removeClippedSubviews={true} // Unmount components when outside of window
                  initialNumToRender={2} // Reduce initial render amount
                  maxToRenderPerBatch={1} // Reduce number in each render batch
                  updateCellsBatchingPeriod={100} // Increase time between renders
                  windowSize={7} // Reduce the window size
                  legacyImplementation={false}
                  onEndReachedThreshold={5}
                  pagingEnabled={true}
                  onEndReached={this.renderImage}

                  renderItem={({ item, index }) => (
                     this.renderImage(item)
                  )}
               />




            </ScrollView>

            <View style={{ width: '100%', height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, flexDirection: 'row' }}>
               <View active style={{ flex: 1, flexDirection: 'column', height: 50, paddingStart: 25 }}>


                  <Icon   onPress={()=>{
                     Linking
                     .openURL("http://api.whatsapp.com/send?phone=" + "919625621052" + "&text" + "मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ")
                     .catch(err => console.error('Error', err))
                  }} name='md-home' style={{ color: '#03DAC5' }} />
                  <Text style={{ color: '#6200EE' }}>Home</Text>
               </View>
               <View style={{ flex: 1, flexDirection: 'column', height: 50 }}>


                  <Icon   onPress={()=>{
                     Linking
                     .openURL("http://api.whatsapp.com/send?phone=" + "919625621052" + "&text" + "मनुफैक्चरर ,  व्होलसेलर , ट्रेडर, रिटेलर , अपने बिज़नेस को बढ़ाये DIGI BUSINESS APP को अपनाये  ")
                     .catch(err => console.error('Error', err))
                  }}name='md-person-circle' style={{ color: 'black' }} />
                  <Text style={{ color: 'black', }}>Contact</Text>
               </View>

               <View style={{ flex: 1, flexDirection: 'column', height: 50 }}>


                  <Icon   onPress={()=>{this.onShare()}}name='md-share-social' style={{ color: 'black' }} />
                  <Text style={{ color: 'black', }}>App Share </Text>
               </View>

               <View style={{ flex: 1, flexDirection: 'column', height: 50 }}>


                  <Icon onPress={()=>{this.props.navigation.navigate('Mycard')}} name='md-card' style={{ color: 'black' }} />
                  <Text style={{ color: 'black', }}>My Ads</Text>
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
   },
   child: { width, justifyContent: 'center' },
   text: { fontSize: width * 0.5, textAlign: 'center' },
});