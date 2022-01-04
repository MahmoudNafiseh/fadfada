// Formik x React Native example
import React, { useState, useContext } from 'react';
import { Button, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import axios from 'axios';
import User from '../data/userinfo.json';
import { PostContext } from '../PostContext';
import { useNavigation } from '@react-navigation/native';

import { fetchAPI } from '../fetchAPI';
const PostPage = () => {
   const [post, setPost] = useContext(PostContext);
   const navigation = useNavigation();
   const addPost = async (data) => {
      try {
         await axios
            .post('http://10.0.2.2:3000/Post', data)
            .then(fetchAPI(setPost))
            .then(navigation.navigate('Timeline'));
      } catch (err) {
         console.error(err, 'Add Post error');
      }
   };
   const createDate = () => {
      return new Date();
   };
   return (
      <SafeAreaProvider>
         <SafeAreaView>
            <Formik
               initialValues={{
                  body: '',
                  userid: User[0].id,
                  time: createDate().toJSON(),
               }}
               onSubmit={(values) => addPost(values)}
            >
               {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                     <TextInput
                        onChangeText={handleChange('body')}
                        onBlur={handleBlur('body')}
                        value={values.email}
                     />
                     <Button onPress={handleSubmit} title='Submit' />
                  </View>
               )}
            </Formik>
         </SafeAreaView>
      </SafeAreaProvider>
   );
};
export default PostPage;
