import React, { useState, useEffect, useContext } from 'react';
import {
   Box,
   Text,
   HStack,
   Avatar,
   NativeBaseProvider,
   Input,
} from 'native-base';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Amplify, { Auth, Predicates, SortDirection } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { ProfileContext } from '../ProfileContext';
export default function Profile() {
   const [currUser, setCurrUser] = useState('');
   const [profile, setProfile] = useContext(ProfileContext);
   // useEffect(async () => {
   //    try {
   //       Auth.currentAuthenticatedUser({
   //          bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
   //       })
   //          .then((user) => setCurrUser(user.attributes.sub))
   //          .then(
   //             setProfile(
   //                await DataStore.query(User, (c) => c.sub('eq', currUser))
   //             )
   //          )
   //          .catch((err) => console.log(err));

   //       console.log(currUser);
   //    } catch (err) {
   //       console.log(err);
   //    }
   // }, [currUser]);

   return (
      <NativeBaseProvider>
         <SafeAreaView style={{ backgroundColor: '#000000', height: '100%' }}>
            <Box bg='#FFFFFF30' h='100%' p='6'>
               <HStack justifyContent={'center'} py={4}>
                  <Avatar
                     bg='#FF7900'
                     size={'2xl'}
                     source={{ uri: profile[0].image }}
                  />
               </HStack>
               <HStack w='90%' justifyContent={'center'} py={4}>
                  <HStack justifyContent={'center'} alignItems={'center'}>
                     <Text fontSize={18} color='white'>
                        First Name:
                     </Text>
                     <Input
                        value={profile[0].firstName}
                        color='white'
                        backgroundColor='#595959'
                        borderColor={'#00000000'}
                        size={'md'}
                        w='48'
                        fontSize={16}
                        ml={4}
                        isReadOnly
                     />
                  </HStack>
               </HStack>
               <HStack w='90%' justifyContent={'center'} py={4}>
                  <HStack justifyContent={'center'} alignItems={'center'}>
                     <Text fontSize={18} color='white'>
                        Last Name:
                     </Text>
                     <Input
                        value={profile[0].lastName}
                        color='white'
                        backgroundColor='#595959'
                        size={'md'}
                        borderColor={'#00000000'}
                        w='48'
                        fontSize={16}
                        ml={4}
                        isReadOnly
                     />
                  </HStack>
               </HStack>
            </Box>
         </SafeAreaView>
      </NativeBaseProvider>
   );
}
