import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';

import SelectDropdown from 'react-native-select-dropdown';

const { width, height } = Dimensions.get('window');

import database from '@react-native-firebase/database';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import { FlatList } from 'react-native-gesture-handler';

import CheckBox from '@react-native-community/checkbox';

import { firebase } from '@react-native-firebase/auth';

export default class AddBooking extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            bname: '',
            sliderimg2: [],
            countries: ["Egypt", "Canada", "Australia", "Ireland"],
            category: [],
            place: [],
            images: [],
            toggleCheckBox:false,
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
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Business name"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Product category name"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter brand name"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter mobile 1[10 digit]"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter mobile 2[10 digit]"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Whatsapp No"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Landline No"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Email"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Website url"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Address"
                            keyboardType="default"
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
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter landmark"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Village Name"
                            keyboardType="default"
                        />

                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter City"
                            keyboardType="default"
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
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Pincode"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter State"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter business pet name"
                            keyboardType="default"
                        />

                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter youtube video url"
                            keyboardType="default"
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
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="Enter about us"
                            keyboardType="default"
                        />

                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="Owner Name/Enter shop timetable like : Mon-Sat 9AM to 7PM"
                            keyboardType="default"
                        />


                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="Enter Ref: Id"
                            keyboardType="default"
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


                        <Button style={{backgroundColor:'#1976D2',width:"95%",alignSelf:'center',flex:1,justifyContent:'center',alignContent:'center'}}>
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