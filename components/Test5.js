import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
   FlatList,
   StyleSheet,
   KeyboardAvoidingView,
   Platform,
   Keyboard,
} from 'react-native';
import Messages from '../data/messages.json';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { Text, View, Button, Input, HStack, Avatar } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
function Test5() {
   const flatList = useRef(null);
   const [userInfo, setUserInfo] = useState(null);
   const [messages, setMessages] = useState([]);
   const [messageBody, setMessageBody] = useState('');

   const handleChange = (text) => {
      setMessageBody(text);
   };

   const onSubmit = async () => {
      // event.preventDefault();
      // event.stopPropagation();
      return;
      const input = {
         channelID: '1',
         author: userInfo.id,
         body: messageBody.trim(),
      };

      try {
         setMessageBody('');
         await API.graphql(graphqlOperation(createMessage, { input }));
      } catch (error) {
         console.warn(error);
      }
   };

   const initialValues = {
      msg: '',
   };
   const formik = useFormik({
      initialValues,
      onSubmit,
   });

   const { handleSubmit, isSubmitting } = formik;

   return (
      <SafeAreaView backgroundColor='#212121' height='100%'>
         <View style={styles.container}>
            {/* <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               keyboardVerticalOffset={200}
            >
               <View style={{ display: 'flex' }}>
                  <FlatList
                     data={messages}
                     ref={flatList}
                     onContentSizeChange={() =>
                        flatList.current.scrollToEnd({ animated: true })
                     }
                     onLayout={() =>
                        flatList.current.scrollToEnd({ animated: true })
                     }
                     renderItem={({ item }) => (
                        <MessageItem
                           item={item}
                           author={item.author === userInfo?.id ? true : false}
                        />
                     )}
                     keyExtractor={(item) => item.id}
                     maxToRenderPerBatch={10}
                     removeClippedSubviews
                  />
               </View>
            </KeyboardAvoidingView> */}
            <View>
               <View mt={3}>
                  <HStack justifyContent={'flex-start'} alignItems='flex-end'>
                     <HStack>
                        <Avatar
                           size={'xs'}
                           source={{ uri: undefined }}
                           mx={3}
                        />
                     </HStack>
                     <HStack
                        style={styles.msgContainerNotMe}
                        bg={'#FFFFFF20'}
                        py={2}
                        px={2}
                     >
                        <Text style={styles.msg}>{Messages[0].body}</Text>
                     </HStack>
                  </HStack>
                  <Text ml={3} color='white'>
                     Loai
                  </Text>
               </View>

               <View>
                  <HStack justifyContent={'flex-start'} alignItems={'flex-end'}>
                     <HStack bottom={0}>
                        <Avatar
                           size={'xs'}
                           source={{ uri: undefined }}
                           mx={3}
                        />
                     </HStack>
                     <HStack
                        style={styles.msgContainerNotMe}
                        bg={'#FFFFFF20'}
                        py={2}
                        px={2}
                     >
                        <Text style={styles.msg}>{Messages[1].body}</Text>
                     </HStack>
                  </HStack>
                  <Text ml={3} color='white'>
                     Amal
                  </Text>
               </View>
               <View>
                  <HStack justifyContent={'flex-end'} pt={2}>
                     <HStack
                        style={styles.msgContainerMe}
                        bg={'#FFFFFF20'}
                        py={2}
                        px={2}
                     >
                        <Text style={styles.msgMe}>{Messages[2].body}</Text>
                     </HStack>
                  </HStack>
               </View>
               <View>
                  <HStack justifyContent={'flex-end'} pt={2}>
                     <HStack
                        style={styles.msgContainerMe}
                        bg={'#FFFFFF20'}
                        py={2}
                        px={2}
                     >
                        <Text style={styles.msgMe}>{Messages[4].body}</Text>
                     </HStack>
                  </HStack>
               </View>
            </View>
            <View
               display={'flex'}
               flexDir={'column'}
               justifyContent={'flex-end'}
               h='20%'
               bottom={-110}
               position={'absolute'}
               w='100%'
            >
               <View
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
               >
                  <Input
                     isReadOnly
                     w='95%'
                     type='text'
                     color={'white'}
                     rounded={'full'}
                     multiline
                     value={'This is just sample text'}
                  />
                  <Button
                     position={'absolute'}
                     alignSelf={'flex-end'}
                     right={4}
                     rounded={'full'}
                     size={8}
                     onPress={handleSubmit}
                     colorScheme='orange'
                     bg='#FF7900'
                  >
                     <FontAwesome name='send' size={16} color='black' />
                  </Button>
               </View>
            </View>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      height: '80%',
   },
   msg: {
      fontSize: 16,
      marginRight: 7,
      marginLeft: 7,
      flexWrap: 'wrap',
      color: 'white',
   },
   msgMe: {
      fontSize: 16,
      marginRight: 7,
      marginLeft: 7,
      flexWrap: 'wrap',
      color: 'white',
   },
   msgContainerNotMe: {
      borderRadius: 10,
      display: 'flex',
      // justifyContent: 'center',
      minWidth: 80,
      maxWidth: 240,
      // marginBottom: 5,
      marginLeft: 5,
      borderColor: '#ff7900',
      borderWidth: 1,
   },
   msgContainerMe: {
      backgroundColor: '#FF7900',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flex: 1,
      // marginBottom: 5,
      marginRight: 5,
      maxWidth: 240,

      paddingBottom: 10,
      paddingTop: 10,
   },
   containerMe: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
   },
   containerNotMe: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
   },
   time: {
      lineHeight: 30,
      fontSize: 16,
   },
});

export default Test5;
