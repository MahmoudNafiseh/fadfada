import React from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from './models';
export default async function fetchAPI(setPost) {
   try {
      const postData = await DataStore.query(Post);
      await setPost(postData);
   } catch (err) {
      console.log(err);
   }
}
