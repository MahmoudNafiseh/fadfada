import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';
import {
   Heading,
   View,
   useColorMode,
   NativeBaseProvider,
   extendTheme,
   Box,
   Input,
   Pressable,
   Text,
   FormControl,
   Modal,
   Avatar,
   HStack,
} from 'native-base';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuItem from './MenuItem';
import BottomSheet from './BottomSheet';
import User from '../data/userinfo.json';

// Define the config
const config = {
   useSystemColorMode: false,
   initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function HomeScreen() {
   const { height, width } = useWindowDimensions();
   const { colorMode, toggleColorMode } = useColorMode();
   const [modalVisible, setModalVisible] = useState(false);
   const [message, setMessage] = useState('');
   const navigation = useNavigation();

   const handleChange = (e) => {
      e.preventDefault();
      setMessage(e.target.value);
      console.log(inputRef.value, message);
   };

   return (
      <SafeAreaProvider>
         <NativeBaseProvider>
            <SafeAreaView style={{ backgroundColor: 'gray.900' }}>
               {/* <BottomSheet /> */}

               <Box
                  bg={colorMode === 'dark' ? 'black' : 'white'}
                  pt={2}
                  alignContent={'flex-start'}
                  backgroundColor={'gray.900'}
               >
                  <View
                     px={5}
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: height - 64,
                        justifyContent: 'space-evenly',
                     }}
                  >
                     <View>
                        <Heading color='white'>
                           Hello {User[0].name.split(' ')[0]}!
                        </Heading>
                        <Text color='#ffffff75'>What's bothering you?</Text>
                     </View>
                     <HStack
                        space={4}
                        justifyContent={'center'}
                        alignItems={'center'}
                        h={'15%'}
                     >
                        <Avatar
                           bg='green.500'
                           source={{
                              uri: User[0].avatar,
                           }}
                           size='24'
                        />
                        <Pressable
                           onPress={() => {
                              // setModalVisible(true);
                              // hideHeader();
                              navigation.navigate('Test2');
                           }}
                           borderRadius={'3xl'}
                           w={'2/3'}
                           h={'3/4'}
                           backgroundColor={'#ffffff15'}
                           justifyContent={'center'}
                           alignItems={'center'}
                        >
                           <Text color={'#ffffff40'}>
                              Share anything you want.
                           </Text>
                        </Pressable>
                     </HStack>
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test1'}
                     />
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test2'}
                     />
                     <MenuItem
                        text={'text'}
                        color={'#FF000070'}
                        component={'Test3'}
                     />
                  </View>
               </Box>

               <Modal
                  avoidKeyboard
                  isOpen={modalVisible}
                  onClose={() => setModalVisible(false)}
               >
                  <Modal.Content>
                     <Modal.Header>What's on your mind?</Modal.Header>
                     <FormControl>
                        <Input
                           value={message}
                           w={{
                              base: '75%',
                              md: '25%',
                           }}
                           size='xl'
                           onChangeText={(text) => setMessage(text)}
                           placeholder='Share anything you want.'
                        />
                     </FormControl>
                  </Modal.Content>
               </Modal>
            </SafeAreaView>
         </NativeBaseProvider>
      </SafeAreaProvider>
   );
}
