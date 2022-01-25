import React from 'react';
import { Pressable, Box, HStack, Avatar, Heading } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AchievementsHome = () => {
   const navigation = useNavigation();

   return (
      <Pressable h='40%' onPress={() => navigation.navigate('Test1')}>
         {({ isHovered, isPressed }) => {
            return (
               <HStack
                  justifyContent={'space-around'}
                  alignItems={'center'}
                  space={4}
                  w={'100%'}
                  h={'100%'}
                  borderRadius={'2xl'}
                  bg={isPressed ? '#2b2b2e' : isHovered ? '#2b2b2e' : '#3c3c3f'}
               >
                  <HStack
                     justifyContent={'center'}
                     alignItems={'center'}
                     space={2}
                     pl={4}
                  >
                     <Box>
                        <Entypo name='trophy' size={24} color='white' />
                     </Box>
                     <Heading color={'white'} fontSize={'lg'}>
                        Achievements
                     </Heading>
                  </HStack>
                  <Avatar.Group
                     size={'md'}
                     max={3}
                     borderWidth={5}
                     borderColor={
                        isPressed
                           ? '#2b2b2e'
                           : isHovered
                           ? '#2b2b2e'
                           : '#3c3c3f'
                     }
                  >
                     <Avatar size='md' bg={'gray.900'}>
                        🚭
                     </Avatar>
                     <Avatar size='md' bg={'gray.900'}>
                        🛌
                     </Avatar>
                     <Avatar size='md' bg={'gray.900'}>
                        🏃‍♂️
                     </Avatar>
                  </Avatar.Group>
               </HStack>
            );
         }}
      </Pressable>
   );
};

export default AchievementsHome;
