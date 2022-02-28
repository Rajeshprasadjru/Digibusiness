import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { Icon } from 'native-base';

export default class AddBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bname: '',
            sliderimg2: [],
            countries: ["Egypt", "Canada", "Australia", "Ireland"],
            category: [],
        }
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
                            placeholder="*Enter landmark"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter Village"
                            keyboardType="default"
                        />

                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter City"
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
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter youtube video url"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter youtube video url"
                            keyboardType="default"
                        /><TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Select Category"
                            keyboardType="default"
                        /><TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Select Location"
                            keyboardType="default"
                        /><TextInput
                            style={styles.input}
                            //onChangeText={onChangeNumber}
                            value={this.state.bname}
                            placeholder="*Enter about us"
                            keyboardType="default"
                        />





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
});