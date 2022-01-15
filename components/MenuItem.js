import React from 'react';
import { Box, Pressable, Spacer, Text, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const MenuItem = ({ text, color, component }) => {
   const navigation = useNavigation();
   return (
      <Pressable
         onPress={() => {
            navigation.navigate(component);
         }}
      >
         <Box
            rounded='lg'
            bg={color}
            p='14%'
            _text={{ fontSize: 'xl', fontWeight: '300' }}
            on
         >
            {text}
         </Box>
      </Pressable>
   );
};
export default MenuItem;
