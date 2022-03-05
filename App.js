import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Dimensions, ScrollView, Image, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './src/Home';
import Notifications from './src/Notifications';
import Profile from './src/Profile';

import AboutUs from './src/AboutUs';

import Payment from './src/Payment';

import Detail from './src/Detail';

import Category from './src/Category';

import Login from './src//Login';

import Mycard from './src//Mycard';

const { height } = Dimensions.get('window');
const Drawer = createDrawerNavigator();
import { Icon } from 'native-base';
import AddBooking from './src/AddBooking';

function MyDrawer() {
  return (

    <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) =>

        <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#6200EE',
        inactiveTintColor: 'black',
        itemStyle: { marginVertical: 0 },
        labelStyle: { fontSize: height / 50 },

      }}

      drawerStyle={{
        backgroundColor: 'white',


      }}


      overlayColor="transparent"
      screenOptions={{
        headerShown: false
      }}>

      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-home"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'My Profile',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-person"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />
      <Drawer.Screen
        name="AddBooking"
        component={AddBooking}
        options={{
          title: 'Add Booking',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-person"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

      <Drawer.Screen
        name="Share"
        component={Login}
        options={{
          title: 'Share',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-share-social"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

      <Drawer.Screen
        name="Contact Us"
        component={Home}
        options={{
          title: 'Contact Us',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-person-circle"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          title: 'About Us',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-person-circle"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

      <Drawer.Screen
        name="Logout"
        component={Home}
        options={{
          title: 'Logout',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-log-out-outline"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Payment',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="md-card-outline"
              size={size}
              style={{ color: focused ? '#6200EE' : 'grey' }}
            />
          ),
        }}

      />

     <Drawer.Screen
        name="Category"
        component={Category}

      />   

    <Drawer.Screen
        name="Detail"
        component={Detail}

      />   

    <Drawer.Screen
        name="Mycard"
        component={Mycard}

      /> 

    <Drawer.Screen
        name="Login"
        component={Login}

      />         


    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}


function CustomDrawerContent(props) {

  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(

        (routeName) => {
          routeName !== 'Category' && routeName !== 'Detail' && routeName !== 'Mycard' && routeName !== 'Login' && routeName !== 'Mensfashion' && routeName !== 'Shopcatgories' && routeName !== 'Flash' && routeName !== 'Stores' && routeName !== 'Brands' && routeName !== 'Deals' && routeName !== 'Login' && routeName !== 'Signup' && routeName !== 'KidsFashion' && routeName !== 'Orderdetail' && routeName !== 'Search' && routeName !== 'Editprofile' && routeName !== 'CategoryList';
        },
      ),
      routes: props.state.routes.filter(
        (route) =>
          route.name !== 'Category' && route.name !== 'Detail' && route.name !== 'Mycard'  && route.name !== 'Login' && route.name !== 'Mensfashion' && route.name !== 'Shopcatgories' && route.name !== 'Flash' && route.name !== 'Stores' && route.name !== 'Brands' && route.name !== 'Deals' && route.name !== 'Login' && route.name !== 'Signup' && route.name !== 'KidsFashion' && route.name !== 'Orderdetail' && route.name !== 'Search' && route.name !== 'Editprofile' && route.name !== 'CategoryList',

      ),
    },
  };

  return (

    <SafeAreaView>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode={'contain'}
            style={{ height: 120, justifyContent: 'center', alignItems: 'center', margin: 10 }}

            source={require('./assets/mdigibusiness.png')}
          />

        </View>



        <DrawerItemList {...filteredProps} />


      </ScrollView>





    </SafeAreaView>
  );
}