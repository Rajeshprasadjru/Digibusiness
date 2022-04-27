import React,{Component} from 'react';
import { SafeAreaView, StyleSheet, Text, View,Image, ScrollView,ImageBackground,TouchableOpacity,Linking} from 'react-native';
import { Icon } from 'native-base';

import database from '@react-native-firebase/database';

import { FlatList } from 'react-native-gesture-handler';

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            place: [],
            result: [],
        }
    }
    componentDidMount(){
        this.setState({
            place:[]
        })
        this.setState({
            result:[]
        })
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //Alert.alert('Refreshed');
            console.log('refreshed');
            var cat = [];
            this.setState({
                place:[]
            })
            this.setState({
                result:[]
            })
            database().ref('Place').once('value', (snap) => {
      
               snap.forEach((child) => {
                  let item = child.val();
                  item.id = child.key;
                  let catt= this.state.place
                  console.log("place",item);
                 
                  database().ref('Business').child(item.c_name).once('value', (snap) => {
                     
                    snap.forEach((child) => {
                    let item = child.val();
                    console.log("place data",item);
    
                    if(item.v_category === this.props.route.params.item){
                        let rr= this.state.result;
                        rr.push({item});
                        this.setState({
                            result:rr
                        })
                     }
                    
                    })
    
                    
                  })
                  
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
      
               console.log("rrrrrrrr", this.state.result);
            });
            console.log("categoryname",this.props.route.params.item);
        })


       

    }

    _listEmptyComponent = () => {
        return (
            <View style={{paddingTop:20}}>
                <Text style={{alignContent:'center',justifyContent:'center',alignSelf:'center',color:'grey'}}>No card available</Text>
            </View>
        )
      }

    renderCategory = (item) =>{

        console.log("flatlist",item.item.id);

        return(


         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Detail',{place:item.item.v_location,id:item.item.id})}}>
        <View 
        style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
        
           <View 
           style={{flexDirection:'row',padding:10}}>
           <Image
                style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                source={{uri:item.item.v_profile_image}}
             />
            <View style={{flexDirection:'column',padding:10}}> 
               <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>{item.item.v_name}</Text>
               <View style={{flexDirection:'row',padding:3}}>
                   <Icon
                   style={{fontSize:18,color:'white'}}
                   name='md-person'/>
                   <Text style={{fontSize:15,marginStart:5,color:'white'}}>{item.item.v_holder_name}</Text>
               </View>
               <View style={{flexDirection:'row',padding:3}}>
                   <Icon
                   style={{fontSize:18,color:'white'}}
                   name='md-pricetag-sharp'/>
                   <Text style={{fontSize:15,marginStart:5,color:'white'}}>{item.item.v_category}</Text>
               </View>
               
            </View> 


         </View> 

         <View style={{flexDirection:'row',flex:1}}>


             <TouchableOpacity 
             style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}
             onPress={()=>Linking
                .openURL("tel:"+item.item.v_mobile)
                .catch(err => console.error('Error', err))}>
             <View 
             style={{flexDirection:'row',flex:1,backgroundColor:'white',borderRadius:10}}>
                 <Icon
                 style={{fontSize:22,margin:5,color:'blue'}}
                 name='md-call'/>
                 <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
             </View>
             </TouchableOpacity>

             <TouchableOpacity onPress={()=>Linking
                .openURL("http://api.whatsapp.com/send?phone=" + "91" + item.item.v_whatsapp + "&text" + "")
                .catch(err => console.error('Error', err))}>
             <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                 <Icon
                 style={{fontSize:22,margin:5,color:'green'}}
                 name='md-logo-whatsapp'/>
                 <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
             </View>

             </TouchableOpacity>

         </View>

        </View>
       
         </TouchableOpacity>
        )

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

            <FlatList
                  horizontal={false}
                  index={0}
                  data={this.state.result}

                  removeClippedSubviews={true} // Unmount components when outside of window
                  initialNumToRender={2} // Reduce initial render amount
                  maxToRenderPerBatch={1} // Reduce number in each render batch
                  updateCellsBatchingPeriod={100} // Increase time between renders
                  windowSize={7} // Reduce the window size
                  legacyImplementation={false}
                  onEndReachedThreshold={5}
                  pagingEnabled={true}
                 
                  ListEmptyComponent={this._listEmptyComponent}

                  renderItem={({ item, index }) => (
                     this.renderCategory(item)
                  )}
               />

            {/* <ScrollView horizontal={false}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail')}>
                <View 
                style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
                
                   <View 
                   style={{flexDirection:'row',padding:10}}>
                   <Image
                        style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                        source={require('../assets/ro.jpeg')}
                     />
                    <View style={{flexDirection:'column',padding:10}}> 
                       <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>SWEETY SINGH</Text>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-person'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>ELECTRICAL CONTROL</Text>
                       </View>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-pricetag-sharp'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>Electrical and Eleectronic</Text>
                       </View>
                       
                    </View> 


                 </View> 

                 <View style={{flexDirection:'row',flex:1}}>
                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'blue'}}
                         name='md-call'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
                     </View>

                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'green'}}
                         name='md-logo-whatsapp'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
                     </View>

                 </View>

                </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail')}>
                <View 
                style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
                
                   <View 
                   style={{flexDirection:'row',padding:10}}>
                   <Image
                        style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                        source={require('../assets/ro.jpeg')}
                     />
                    <View style={{flexDirection:'column',padding:10}}> 
                       <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>SWEETY SINGH</Text>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-person'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>ELECTRICAL CONTROL</Text>
                       </View>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-pricetag-sharp'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>Electrical and Eleectronic</Text>
                       </View>
                       
                    </View> 


                 </View> 

                 <View style={{flexDirection:'row',flex:1}}>
                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'blue'}}
                         name='md-call'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
                     </View>

                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'green'}}
                         name='md-logo-whatsapp'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
                     </View>

                 </View>

                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail')}>
                <View 
                style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
                
                   <View 
                   style={{flexDirection:'row',padding:10}}>
                   <Image
                        style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                        source={require('../assets/ro.jpeg')}
                     />
                    <View style={{flexDirection:'column',padding:10}}> 
                       <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>SWEETY SINGH</Text>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-person'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>ELECTRICAL CONTROL</Text>
                       </View>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-pricetag-sharp'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>Electrical and Eleectronic</Text>
                       </View>
                       
                    </View> 


                 </View> 

                 <View style={{flexDirection:'row',flex:1}}>
                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'blue'}}
                         name='md-call'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
                     </View>

                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'green'}}
                         name='md-logo-whatsapp'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
                     </View>

                 </View>

                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail')}>
                <View 
                style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
                
                   <View 
                   style={{flexDirection:'row',padding:10}}>
                   <Image
                        style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                        source={require('../assets/ro.jpeg')}
                     />
                    <View style={{flexDirection:'column',padding:10}}> 
                       <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>SWEETY SINGH</Text>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-person'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>ELECTRICAL CONTROL</Text>
                       </View>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-pricetag-sharp'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>Electrical and Eleectronic</Text>
                       </View>
                       
                    </View> 


                 </View> 

                 <View style={{flexDirection:'row',flex:1}}>
                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'blue'}}
                         name='md-call'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
                     </View>

                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'green'}}
                         name='md-logo-whatsapp'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
                     </View>

                 </View>

                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail')}>
                <View 
                style={{backgroundColor:'#2596be',borderRadius:10,borderColor:'grey',borderWidth:0.5,margin:5}}>
                
                   <View 
                   style={{flexDirection:'row',padding:10}}>
                   <Image
                        style={{ height: 80, width: '22%',borderRadius:10,marginTop:10}}
                        source={require('../assets/ro.jpeg')}
                     />
                    <View style={{flexDirection:'column',padding:10}}> 
                       <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>SWEETY SINGH</Text>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-person'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>ELECTRICAL CONTROL</Text>
                       </View>
                       <View style={{flexDirection:'row',padding:3}}>
                           <Icon
                           style={{fontSize:18,color:'white'}}
                           name='md-pricetag-sharp'/>
                           <Text style={{fontSize:15,marginStart:5,color:'white'}}>Electrical and Eleectronic</Text>
                       </View>
                       
                    </View> 


                 </View> 

                 <View style={{flexDirection:'row',flex:1}}>
                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'blue'}}
                         name='md-call'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>CALL NOW</Text>
                     </View>

                     <View style={{flexDirection:'row',flex:1,borderRadius:10,borderColor:'grey',borderWidth:0.4,margin:5,backgroundColor:'white'}}>
                         <Icon
                         style={{fontSize:22,margin:5,color:'green'}}
                         name='md-logo-whatsapp'/>
                         <Text style={{fontSize:15,margin:5,fontWeight:'bold'}}>WHATSAPP NOW</Text>
                     </View>

                 </View>

                </View>
                </TouchableOpacity>
            </ScrollView> */}
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