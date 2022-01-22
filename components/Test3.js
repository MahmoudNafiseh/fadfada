import React, { useState, useEffect } from 'react';
import { Box, Text, HStack, Avatar } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Amplify, { Auth, Predicates, SortDirection } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';

export default function Test3() {
   const [currUser, setCurrUser] = useState('');
   const [profile, setProfile] = useState([]);
   useEffect(async () => {
      try {
         Auth.currentAuthenticatedUser({
            bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
         })
            .then((user) => setCurrUser(user.attributes.sub))
            .then(
               setProfile(
                  await DataStore.query(User, (c) => c.sub('eq', currUser))
               )
            )
            .catch((err) => console.log(err));

         console.log(currUser);
      } catch (err) {
         console.log(err);
      }
   }, [currUser]);

   console.log(profile, 'testn');
   return (
      <SafeAreaView>
         {profile.length > 0 ? (
            <Box p='6'>
               <HStack justifyContent={'center'} py={4}>
                  <Avatar size={'2xl'} source={{ uri: profile[0].image }} />
               </HStack>
               <HStack justifyContent={'space-evenly'} py={4}>
                  <Text>First Name: {profile[0].firstName} </Text>
                  <Text>Last Name: {profile[0].lastName}</Text>
               </HStack>
            </Box>
         ) : (
            <Text>Loading... </Text>
         )}
      </SafeAreaView>
   );
}
