import React from 'react';

import { View, Heading, Text } from 'native-base';
const Greeting = ({ user }) => {
   return (
      <View>
         <Heading color='white'>Hello {user}!</Heading>
         <Text color='#ffffff75'>What's bothering you?</Text>
      </View>
   );
};
export default Greeting;
