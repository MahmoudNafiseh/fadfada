import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
   SafeAreaView,
   FlatList,
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   Platform,
   Keyboard,
} from 'react-native';

import Amplify from 'aws-amplify';
import { TextInput, Button } from 'react-native';

import { useFormik } from 'formik';

function Test5() {
   return (
      <SafeAreaView>
         <View>
            <Text>Testing</Text>
         </View>
      </SafeAreaView>
   );
}

export default Test5;
