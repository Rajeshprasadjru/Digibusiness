import React, { Component } from 'react';
import { Share, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Linking, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import SwiperFlatList from 'react-native-swiper-flatlist';
import BlinkView from 'react-native-smooth-blink-view';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import YoutubePlayer from "react-native-youtube-iframe";
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            image: [],
            playing: false,
            vid: [],
        }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //Alert.alert('Refreshed');
            //console.log('refreshed');
            // console.log("ididid", this.props.route.params.id);

            //console.log("place name", this.props.route.params.place);
            database().ref('Business').child(this.props.route.params.place).child(this.props.route.params.id).once('value', (snap) => {

                this.setState({
                    result: snap.val()
                })
                //  console.log("valueeeeeeee", snap.val().multiphoto);

                // snap.val().multiphoto.forEach((child) => {
                //    // console.log(child);
                //     let item = child.val();
                //     console.log("place data", item);

                //     // if(item.v_category === this.props.route.params.item){
                //     //     let rr= this.state.result;
                //     //     rr.push({item});
                //     //     this.setState({
                //     //         result:rr
                //     //     })
                //     //  }

                // })

                console.log("resssssssss", this.state.result.v_service);

                var url = this.state.result.v_service;
                var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {
                    console.log("video id = ", videoid[1]);
                    this.setState({vid:videoid[1]})
                } else {
                    console.log("The youtube url is not valid.");
                }

                
            })
            database().ref('Business').child(this.props.route.params.place).child(this.props.route.params.id).child('multiphoto').once('value', (snap) => {

                // this.setState({
                //     result: snap.val()
                // })
                // console.log("imageee", snap.val());

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
        return (
            <SafeAreaView>
                <ScrollView horizontal={false}>
                    <View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Category')}
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
                                .openURL("tel:" + this.state.result.v_mobile)
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
                            <Text numberOfLines={2} style={{ marginStart: 5 }}>{this.state.result.v_address}</Text>

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
                        <BlinkView
                            delayVisible={300}
                            delayInvisible={0}
                            duration={500}
                            blinking>
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
                        </BlinkView>
                        <BlinkView
                            delayVisible={300}
                            delayInvisible={0}
                            duration={500}
                            blinking>
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

                        </BlinkView>

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
    map: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get("window").width / 2,
    },

});