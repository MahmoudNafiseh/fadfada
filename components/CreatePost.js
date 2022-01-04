import React from 'react';
import { HStack, Pressable, Avatar, Text, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const CreatePost = ({ avatar }) => {
   const navigation = useNavigation();

   return (
      <HStack
         space={4}
         justifyContent={'center'}
         alignItems={'center'}
         h={'40%'}
      >
         <Avatar
            bg='green.500'
            source={{
               uri: avatar,
            }}
            size='24'
         />
         <Pressable
            onPress={() => {
               navigation.navigate('PostPage');
            }}
            borderRadius={'3xl'}
            w={'2/3'}
            h={'3/4'}
            backgroundColor={'#ffffff15'}
         >
            {({ isHovered, isPressed }) => {
               return (
                  <Box
                     bg={
                        isPressed
                           ? '#ffffff00'
                           : isHovered
                           ? '#ffffff00'
                           : '#ffffff15'
                     }
                     w='100%'
                     h='100%'
                     rounded='3xl'
                     justifyContent={'center'}
                     alignItems={'center'}
                  >
                     <Text color={'#ffffff50'}>Share anything you want.</Text>
                  </Box>
               );
            }}
         </Pressable>
      </HStack>
   );
};

export default CreatePost;
