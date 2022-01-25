import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
   NativeBaseProvider,
   extendTheme,
   Modal,
   Button,
   ScrollView,
   Heading,
   Text,
   Box,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Amplify, { Auth, Predicates, SortDirection } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Post, User } from './models';
import awsconfig from './aws-exports';
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PostContext } from './PostContext';
import { ProfileContext } from './ProfileContext';
import HomeScreen from './components/HomeScreen';
import Timeline from './components/Timeline';
import Test1 from './components/Test1';
import PostPage from './components/PostPage';
import Profile from './components/Profile';
import Test5 from './components/Test5';
import fetchAPI from './fetchAPI';
import RenderItem from './components/RenderItem';
import { ModalContext } from './ModalContext';
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

Amplify.configure({
   ...awsconfig,
   Analytics: {
      disabled: true,
   },
});
export const theme = extendTheme({ config });

async function signOut() {
   try {
      await Auth.signOut({ global: true });
   } catch (error) {
      console.log('error signing out: ', error);
   }
}

function App() {
   const [post, setPost] = useState([]);
   const [profile, setProfile] = useState([]);
   let currUser;
   const [modalVisible, setModalVisible] = useState(false);

   const handleModal = () => {
      setModalVisible(!modalVisible);
   };

   useEffect(async () => {
      try {
         Auth.currentAuthenticatedUser({
            bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
         })
            .then((user) => (currUser = user.attributes.sub))
            .then(
               setProfile(
                  await DataStore.query(User, (c) => c.sub('eq', currUser))
               )
            )
            .catch((err) => console.log(err));

         const postData = await DataStore.query(Post, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
         });
         setPost(postData);
      } catch (err) {
         console.log(err);
      } finally {
         const profile = await DataStore.query(User, (c) =>
            c.sub('eq', currUser)
         );
         //    if (profile.length === 0) {
         //       await DataStore.save(
         //          new User({
         //             firstName: 'John',
         //             Posts: [],
         //             Comments: [],
         //             Likes: [],
         //             lastName: 'Doe',
         //             sub: currUser,
         //             checked: true,
         //          })
         //       );
         //    }
      }
   }, []);
   return (
      <PostContext.Provider value={[post, setPost]}>
         <ProfileContext.Provider value={[profile, setProfile]}>
            <ModalContext.Provider value={[modalVisible, setModalVisible]}>
               <NativeBaseProvider>
                  <NavigationContainer>
                     <StatusBar style={'light'} backgroundColor='#18181b' />
                     <Modal
                        isOpen={modalVisible}
                        onClose={setModalVisible}
                        size={'md'}
                     >
                        <Modal.Content bg='gray.900' h='100' maxH='300'>
                           <Modal.Body bg={'gray.900'}>
                              <ScrollView>
                                 <Text fontSize={20} color={'white'}>
                                    Log out of Fadfada?
                                 </Text>
                              </ScrollView>
                           </Modal.Body>
                           <Modal.Footer bg='gray.900'>
                              <Button.Group space={2}>
                                 <Button
                                    variant='ghost'
                                    color={'white'}
                                    colorScheme='orange'
                                    onPress={() => {
                                       setModalVisible(false);
                                    }}
                                 >
                                    Cancel
                                 </Button>
                                 <Button
                                    onPress={() => {
                                       setModalVisible(false);
                                       signOut();
                                    }}
                                    color={'white'}
                                    colorScheme='orange'
                                    bg='#FF7900'
                                 >
                                    Logout
                                 </Button>
                              </Button.Group>
                           </Modal.Footer>
                        </Modal.Content>
                     </Modal>
                     <MyStack />
                     {/* <DrawerNavigator /> */}
                  </NavigationContainer>
               </NativeBaseProvider>
            </ModalContext.Provider>
         </ProfileContext.Provider>
      </PostContext.Provider>
   );
}

function CustomDrawerContent(props) {
   const [modalVisible, setModalVisible] = useContext(ModalContext);
   return (
      <DrawerContentScrollView
         {...props}
         contentContainerStyle={{
            justifyContent: 'space-between',
            flex: 1,
            flexDirection: 'column',
         }}
      >
         <SafeAreaView>
            <DrawerItemList {...props} />
         </SafeAreaView>
         <DrawerItem
            label='Logout'
            labelStyle={{ color: 'white' }}
            activeBackgroundColor='#FF7900'
            style={{ color: 'white' }}
            pressColor='#FF7900'
            pressOpacity={'#FF7900'}
            onPress={() => {
               setModalVisible(!modalVisible);
            }}
         />
      </DrawerContentScrollView>
   );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   return (
      <Drawer.Navigator
         screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#FF7900',
            drawerLabelStyle: { color: 'white' },
            drawerStyle: { backgroundColor: '#000000' },
         }}
         drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
         <Drawer.Screen
            name='Main'
            options={{
               drawerLabel: 'Home',
            }}
            component={Home}
         />
         <Drawer.Screen name='Profile' component={Profile} />
      </Drawer.Navigator>
   );
};

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function Home() {
   return (
      <Tab.Navigator
         barStyle={{
            backgroundColor: '#000',
            height: 64,
         }}
         activeColor='#FF7900'
         screenOptions={{
            headerShown: false,
         }}
      >
         <Tab.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
               tabBarLabel: 'Home',
               tabBarIcon: ({ color }) => (
                  <Entypo name='home' size={24} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name='Timeline'
            component={Timeline}
            options={{
               tabBarLabel: 'Timeline',
               tabBarIcon: ({ color }) => (
                  <MaterialIcons name='timeline' size={24} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name='Messages'
            component={Test5}
            options={{
               tabBarLabel: 'Messages',
               tabBarIcon: ({ color }) => (
                  <Entypo name='chat' size={24} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
function MyStack() {
   return (
      <SafeAreaProvider>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={DrawerNavigator} />
            <Stack.Screen name='Test1' component={Test1} />
            <Stack.Screen name='PostPage' component={PostPage} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='RenderItem' component={RenderItem} />
         </Stack.Navigator>
      </SafeAreaProvider>
   );
}

export default withAuthenticator(App);
