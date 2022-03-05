import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { firebase } from '@react-native-firebase/auth';

import { Icon } from 'native-base';

import OTPInputView from '@twotalltotems/react-native-otp-input';


const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+91',
            confirmResult: null,
        };
    }

    componentDidMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyCboopfCJGoDKEtl82b7PGAB4Hl4won5IU",
            authDomain: "btob-372db.firebaseapp.com",
            databaseURL: "https://btob-372db-default-rtdb.firebaseio.com/",
            projectId: "btob-372db",
            storageBucket: "",
            measurementId: "G-XTHJNW9FCL"
          }
          firebase.initializeApp(firebaseConfig);
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });

                if (this.state.user != null) {
                    console.log("m kya aaya h",this.state.user);
                    console.log("mmmmmmm",this.state.user.uid);
                    firebase.database().ref('Users').child(this.state.user.uid).set({
                        userBio :'',
                        email_id:'',
                        display_name:'',
                        friends: 0,
                        following:0,
                        posts:0,
                        profile_photo:"https://static-media-prod-cdn.itsre-sumo.mozilla.net/static/sumo/img/default-FFA-avatar.png",
                        username:'',
                        user_id:this.state.user.uid,
                        mobile:this.state.user.phoneNumber,

                    }).then(()=>{
                        console.log("inserted");
                    }).catch((error)=>{
                        console.log(error);
                    })
                    
                    
                    this.props.navigation.navigate('Home');
                }
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+91',
                    confirmResult: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });

        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!' });
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    }

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View style={{ padding: 40 }}>
                <Image
                    resizeMode={'contain'}
                    style={{ height: 120, alignSelf: 'center', margin: 70 }}

                    source={require('../assets/mdigibusiness.png')}
                />
                <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Login</Text>


                <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'column', margin: 20, height: 60 }}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            underlineColorAndroid: 'black',
                            borderBottomColor: 'grey', borderBottomWidth: 0.5

                        }}>
                            <Icon style={{ fontSize: 20, marginTop: 10, color: 'grey' }} name="md-phone-portrait" />
                            <TextInput
                                autoFocus
                                style={{
                                    flex: 1,
                                    paddingTop: 10,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    color: '#424242',

                                }}
                                placeholder="Mobile Number"
                                underlineColorAndroid="transparent"
                                onChangeText={value => this.setState({ phoneNumber: value })}
                                value={phoneNumber}
                            />
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => this.signIn()} >
                        <View
                            style={{ backgroundColor: 'black', width: '86%', height: 40, margin: 10, alignSelf: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', textAlign: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={{ padding: 40 }}>
                <Image
                    resizeMode={'contain'}
                    style={{ height: 120, alignSelf: 'center', margin: 70 }}

                    source={require('../assets/mdigibusiness.png')}
                />
                <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>Login</Text>


                <View style={{ borderColor: 'grey', borderWidth: 0.5, borderRadius: 15, marginTop: 20 }}>
                    <View style={{ flexDirection: 'column', margin: 20, height: 60 }}>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            underlineColorAndroid: 'black',
                            borderBottomColor: 'grey', borderBottomWidth: 0.5

                        }}>
                            <Icon style={{ fontSize: 20, marginTop: 10, color: 'grey' }} name="md-phone-portrait" />
                            <TextInput
                                autoFocus
                                style={{
                                    flex: 1,
                                    paddingTop: 10,
                                    paddingRight: 10,
                                    paddingLeft: 10,
                                    color: '#424242',

                                }}
                                placeholder="Mobile Number"
                                underlineColorAndroid="transparent"

                                value={this.state.phoneNumber}
                            />
                        </View>

                    </View>
                    <OTPInputView
                        autoFocus
                        style={{ width: "80%", height: 20, margin: 20 }}
                        pinCount={6}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(value => {
                            this.setState({ codeInput: value })
                        })}
                        value={codeInput}
                    />
                    <TouchableOpacity onPress={() => this.confirmCode()} >
                        <View
                            style={{ backgroundColor: 'black', width: '86%', height: 40, margin: 10, alignSelf: 'center', margin: 20 }}>
                            <Text style={{ color: 'white', textAlign: 'center', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>






            </View>
        );
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {user && (
                    <View
                        style={{
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            //   backgroundColor: '#77dd77',
                            flex: 1,
                        }}
                    >
                        <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
                        <Text style={{ fontSize: 25 }}>Login In Sucessfully!</Text>
                        {/* <Text>{JSON.stringify(user)}</Text> */}
                        <Button title="Log Out" color="red" onPress={this.signOut} />
                    </View>
                )}
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

    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "black",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "black",
    },
});
