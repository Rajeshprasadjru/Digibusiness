import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';

import SelectDropdown from 'react-native-select-dropdown';

const { width, height } = Dimensions.get('window');

import database from '@react-native-firebase/database';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import { FlatList } from 'react-native-gesture-handler';

import CheckBox from '@react-native-community/checkbox';

import { firebase} from '@react-native-firebase/auth';

import storage from '@react-native-firebase/storage';

import RNFetchBlob from 'rn-fetch-blob';

export default class AddBooking extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            businessname: '',
            pcategory: '',
            bname: '',
            mobile: '',
            mobilee: '',
            whatsapp: '',
            landline: '',
            email: '',
            website: '',
            address: '',
            landmark: '',
            village: '',
            city: '',
            pincode: '',
            state: '',
            petname: '',
            videourl: '',
            categorys: '',
            location: '',
            aboutus: '',
            ownername: '',
            refid: '',
            aboutus: '',
            sliderimg2: [],
            countries: ["Egypt", "Canada", "Australia", "Ireland"],
            category: [],
            place: [],
            images: [],
            toggleCheckBox:false,
            userid:'',
            places:'',
            location:'',

        }
    }

    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //Alert.alert('Refreshed');
            console.log('refreshed');

             this.gotit();

        })

    
        var cat = [];
        database().ref('Category').once('value', (snap) => {

            snap.forEach((child) => {
                let item = child.val();
                item.id = child.key;
                let catt = this.state.category
                catt.push(item.c_name)
                cat.push({
                    c_id: child.val().c_id,
                    c_name: child.val().c_name,
                    img_path: child.val().img_path,
                });
                this.setState({
                    category: catt
                })
                console.log("item value", item.c_name);
            });

            console.log("category name", this.state.category);
        });

        database().ref('Place').once('value', (snap) => {

            snap.forEach((child) => {
                let item = child.val();
                item.id = child.key;
                let catt = this.state.place
                catt.push(item.c_name)
                cat.push({
                    c_id: child.val().c_id,
                    c_name: child.val().c_name,
                    img_path: child.val().img_path,
                });
                this.setState({
                    place: catt
                })
                console.log("item value", item.c_name);
            });

            console.log("category name", this.state.place);
        });
    }

    gotit = () =>{
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            console.log("add booking m",user);
            if(user === null){
               this.props.navigation.navigate('Login');
            }
            
        });
    }

    init = async() =>{

        //console.log("meri image ra",this.state.images[0].path);

        
        



        // const { uri } = this.state.images[0].path;
        // const filename = this.state.images[0].path.substring(this.state.images[0].path.lastIndexOf('/') + 1);
        // const uploadUri = Platform.OS === 'ios' ? this.state.images[0].path.replace('file://', '') : this.state.images[0].path;

        // try{
        //   await storage()
        //   .ref(filename)
        //   .putFile(uploadUri);
        //   console.log("upload finally");
        // }catch(e){
        //     console.log(e);
        // }


        
  
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            console.log("uuuuuu",user._user.uid);
            this.setState({userid:user._user.uid});
        });
        console.log("isma user id k",this.state.userid);
       if(this.state.businessname === ''){
          alert("Enter business name");
       }else if(this.state.pcategory === ''){
          alert("Enter product category name");
       }else if (this.state.bname === ''){
          alert("Enter brand name");
       }else if (this.state.mobile === ''){
           alert("Enter mobile 1");
       }else if (this.state.mobilee === ''){
           alert("Enter mobile 2");
       }else if(this.state.whatsapp === ''){
           alert("Enter whatshap no");
       }else if (this.state.landline === ''){
           alert("Enter landline no");
       }else if (this.state.email === ''){
           alert("Enter email");
       }else if(this.state.website === ''){
           alert("Enter website url");
       }else if (this.state.address === ''){
           alert("Enter address");
       }else if (this.state.landmark === ''){
           alert("Enter landmark");
       }
    //    else if (this.state.village === ''){
    //        alert("Enter village name");
    //    }
       else if (this.state.city === ''){
           alert("Enter city");
       }else if (this.state.pincode === ''){
           alert("Enter pincode");
       }else if (this.state.state === ''){
           alert("Enter state");
       }else if (this.state.petname === ''){
           alert("Enter business pet name");
       } else if (this.state.videourl === ''){
           alert("Enter youtube video url");
       } else if(this.state.aboutus === ''){
          alert("Enter about us")
       } else if (this.state.ownername === ''){
          alert("Owner Name/Enter shop timetable like: Mon-Sat 9AM to 7PM")
       } 
    //    else if (this.state.refid === ''){
    //     alert("Enter ref")
    //    }
       else{

          var ref = firebase.database().ref("Business").push();
           
          var newPageKey = ref.key;
          this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            console.log("uuuuuu",user._user.uid);
            this.setState({userid:user._user.uid});
            firebase.database().ref("Pending").child(newPageKey).set({
                id:newPageKey, 
                user_id:user._user.uid,
                v_name:this.state.businessname,
                v_holder_name:this.state.pcategory,
                v_tagline:this.state.bname,
                v_mobile:this.state.mobile,
                v_mobile_:this.state.mobilee,
                v_whatsapp:this.state.whatsapp,
                v_landline:this.state.landline,
                v_email:this.state.email,
                v_website:this.state.website,
                v_address:this.state.address,
                v_landmark:this.state.landmark,
                v_village:this.state.village,
                v_city:this.state.city,
                v_pincode:this.state.pincode,
                v_state:this.state.state,
                v_b_petname:this.state.petname,
                v_service:this.state.videourl,
                v_latitute:'28.6070013',
                v_longitude:'77.078095',
                v_profile_image:'',
                v_about:this.state.aboutus,
                v_time_table:this.state.ownername,
                v_refid:this.state.refid,
                verified:false,
                v_location:this.state.location,
                v_category:this.state.categorys,
                v_gst_no:'',
                v_profile_image:''
  
            }).then(()=>{
              console.log("inserted");
              let photo = this.state.images.map( img=> img.path); 
            photo.forEach(async(image, i) => {
              console.log("aa ja", image);
          const filename = image;
          const uploadUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
          console.log("aa ja", uploadUri);
          try{
            await storage()
            .ref(filename)
            .putFile(uploadUri);
            console.log("upload finally");
           // console.log("upload finally",filename.getDownloadURL()); 
          }catch(e){
              console.log("error",e);
          }
          var reff = firebase.database().ref("Pending").child(newPageKey).child("multiphoto").push();
             
          var newPageKeyy = reff.key;
  
          console.log("m kya h",newPageKeyy);
          storage().ref(filename).getDownloadURL().then((downloadURL) => {
              console.log("get download url",downloadURL);
              firebase.database().ref("Pending").child(newPageKey).child("multiphoto").child(newPageKeyy).set({image_path:downloadURL})
          });
         // firebase.database().ref("Pendingggg").child(newPageKey).child("multiphoto").child(newPageKeyy).set({image_path:storage().ref(filename).getDownloadURL()})
          console.log("url",storage().ref(filename).getDownloadURL());
          if(photo.length-1 === i){
            this.props.navigation.navigate('Home')
            console.log("Last Element")
           }
  
  
                                })


  
          }).catch((error)=>{
              console.log(error);
          })
        });
          

        // this.uploadImage(newPageKey,this.state.images);
      
       }

       
    }

    openPicker = async () => {
        console.log("..........st");

        try {
            const response = await MultipleImagePicker.openPicker({
                selectedAssets: this.state.images,
                isExportThumbnail: true,
                maxVideo: 1,
                usedCameraButton: false,
                isCrop: true,
                isCropCircle: true,
            });

            console.log('response: ', response);
            this.setState({
                images: response
            })

            console.log("rrrrrrrrrrr", this.state.images);
        } catch (e) {
            console.log("error", e);
            alert("tes")
            console.log(e.code, e.message);
        }
    }

    renderItem = (item, index) => {
        console.log("mera item", item);
        console.log("ggggggggggggg", item.item.fileName);
        return (
            <View style={{ margin: 10 }}>
                <Image
                    width={100}
                    source={{
                        uri: item.item.path,
                    }}
                    style={{
                        marginLeft: 6,
                        width: 100,
                        height: 100,
                        marginBottom: 6,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                />
                {/* <TouchableOpacity
                onPress={() => onDelete(item)}
                activeOpacity={0.9}
                style={style.buttonDelete}
              >
                <Text style={style.titleDelete}>Xoá</Text>
              </TouchableOpacity> */}
            </View>
        );

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1 }} >

                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Home')}
                                name='md-arrow-back-sharp' />

                            {/* <Icon
                     style={{ color: '#6200EE',fontSize:20}}
                     name='md-pencil-sharp' /> */}
                            <Image
                                resizeMode="contain"
                                style={{ flex: 1, height: 40 }}
                                source={require('../assets/digibusiness.png')}
                            />
                        </View>
                        <Text style={{ textAlign: 'center' }} >
                            Digital Business Application Form
                        </Text>
                        <Text style={{ textAlign: 'center', marginTop: 10, color: 'red' }}>
                            (*Required Field)
                        </Text>

                        <TextInput
                            style={styles.input}
                            onChangeText={businessname=>this.setState({businessname})}
                            // value={this.state.bname}
                            placeholder="*Enter Business name"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={pcategory=>this.setState({pcategory})}
                            // value={this.state.bname}
                            placeholder="*Enter Product category name"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={bname=>this.setState({bname})}
                            // value={this.state.bname}
                            placeholder="*Enter brand name"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={mobile=>this.setState({mobile})}
                            // value={this.state.bname}
                            placeholder="*Enter mobile 1[10 digit]"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={mobilee=>this.setState({mobilee})}
                            // value={this.state.bname}
                            placeholder="*Enter mobile 2[10 digit]"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={whatsapp=>this.setState({whatsapp})}
                            // value={this.state.bname}
                            placeholder="*Enter Whatsapp No"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={landline=>this.setState({landline})}
                            // value={this.state.bname}
                            placeholder="*Enter Landline No"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={email=>this.setState({email})}
                            // value={this.state.bname}
                            placeholder="*Enter Email"
                            keyboardType="email-address"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={website=>this.setState({website})}
                            // value={this.state.bname}
                            placeholder="*Enter Website url"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={address=>this.setState({address})}
                            // value={this.state.bname}
                            placeholder="*Enter Address"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        {/* <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Landline No"
                            keyboardType="default"
                        /> */}
                        <TextInput
                            style={styles.input}
                            onChangeText={landmark=>this.setState({landmark})}
                            // value={this.state.bname}
                            placeholder="*Enter landmark"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={village=>this.setState({village})}
                            // value={this.state.bname}
                            placeholder="*Enter Village Name"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={city=>this.setState({city})}
                            // value={this.state.bname}
                            placeholder="*Enter City"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />

                        {/* <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Landline No"
                            keyboardType="default"
                        /> */}

                        <TextInput
                            style={styles.input}
                            onChangeText={pincode=>this.setState({pincode})}
                            // value={this.state.bname}
                            placeholder="*Enter Pincode"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={state=>this.setState({state})}
                            // value={this.state.bname}
                            placeholder="*Enter State"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={petname=>this.setState({petname})}
                            // value={this.state.bname}
                            placeholder="*Enter business pet name"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={videourl=>this.setState({videourl})}
                            // value={this.state.bname}
                            placeholder="*Enter youtube video url"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />


                        {/* <Text style={{ marginStart: 10, marginTop: 10 }}>Select Category</Text> */}

                        <View style={{ margin: 10 }}>
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

                                rowTextStyle={{ textAlign: 'left' }}
                                defaultButtonText={'Select Category'}
                                buttonStyle={{ borderColor: 'grey', borderRadius: 5, borderWidth: 0.5, width: width / 1.05 }}
                                buttonTextStyle={{ textAlign: 'left' }}
                                dropdownStyle={{ width: width / 1.05, height: height / 1.8 }}
                                data={this.state.category}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    //  this.props.navigation.navigate('Category',{item:selectedItem})
                                    this.setState({categorys:selectedItem})
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


                        </View>

                        {/* <Text style={{ marginStart: 10, marginTop: 10 }}>Select Location</Text> */}

                        <View style={{ margin: 10 }}>
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

                                rowTextStyle={{ textAlign: 'left' }}
                                defaultButtonText={'Select Location'}
                                buttonStyle={{ borderColor: 'grey', borderRadius: 5, borderWidth: 0.5, width: width / 1.05 }}
                                buttonTextStyle={{ textAlign: 'left' }}
                                dropdownStyle={{ width: width / 1.05, height: height / 1.8 }}
                                data={this.state.place}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    //  this.props.navigation.navigate('Category',{item:selectedItem})
                                    this.setState({location:selectedItem})
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

                        </View>

                        <TextInput
                            style={styles.input}
                            onChangeText={aboutus=>this.setState({aboutus})}
                            // value={this.state.bname}
                            placeholder="Enter about us"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />

                        <TextInput
                            style={styles.input}
                            onChangeText={ownername=>this.setState({ownername})}
                            // value={this.state.bname}
                            placeholder="Owner Name/Enter shop timetable like : Mon-Sat 9AM to 7PM"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />


                        <TextInput
                            style={styles.input}
                            onChangeText={refid=>this.setState({refid})}
                            // value={this.state.bname}
                            placeholder="Enter Ref: Id"
                            keyboardType="default"
                            autoCapitalize='characters'
                        />

                        <TouchableOpacity onPress={() => this.openPicker()}>
                            <View
                                style={{ width: '95%', height: 40, borderColor: 'grey', borderRadius: 10, borderWidth: 0.5, flex: 1, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', top: 10 }}>
                                <Text style={{ alignSelf: 'center' }}>UPLOAD PHOTOS</Text>
                            </View>

                        </TouchableOpacity>

                        <View style={{ padding: 10 }}>
                            <FlatList
                                horizontal
                                style={[
                                    styles.containers,
                                    {
                                        paddingTop: 6,
                                    },
                                ]}
                                data={this.state.images}
                                keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
                                renderItem={this.renderItem}
                            />

                        </View>


                        <View style={{flexDirection:'row',margin:10}}>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleCheckBox}
                            onValueChange={(newValue) => this.setState({toggleCheckBox:newValue})}
                        />

                        <Text style={{margin:5,justifyContent:'center',color:'grey'}}>I am making my own digital Business card with my desire, all the information given init is right according to me, I have filled the form by itself if the information given in it is shared by anyone through Digi Business then I have no objection</Text>

                        </View>


                        <Button 
                        onPress = {()=>this.init()}
                        style={{backgroundColor:'#1976D2',width:"95%",alignSelf:'center',flex:1,justifyContent:'center',alignContent:'center'}}>
                            <Text style={{color:'white'}}>
                                SUBMIT
                            </Text>
                        </Button>


                        <View style={{ padding: 10 }}>
                        </View>




                    </View>

                </ScrollView>

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
    input: {
        height: 35,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey',
        borderRadius: 10,
    },
    containers: {
        flex: 1,
    },

});