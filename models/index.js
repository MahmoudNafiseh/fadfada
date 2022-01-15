// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Likes, Comment, Post, User } = initSchema(schema);

export {
  Likes,
  Comment,
  Post,
  User
};