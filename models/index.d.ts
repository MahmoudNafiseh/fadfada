import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LikesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Likes {
  readonly id: string;
  readonly postID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Likes, LikesMetaData>);
  static copyOf(source: Likes, mutator: (draft: MutableModel<Likes, LikesMetaData>) => MutableModel<Likes, LikesMetaData> | void): Likes;
}

export declare class Comment {
  readonly id: string;
  readonly body: string;
  readonly postID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class Post {
  readonly id: string;
  readonly body: string;
  readonly createdAt: string;
  readonly image?: string;
  readonly userID?: string;
  readonly Comments?: (Comment | null)[];
  readonly Likes?: Comment[];
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class User {
  readonly id: string;
  readonly firstName: string;
  readonly image?: string;
  readonly Posts?: Comment[];
  readonly Comments?: Comment[];
  readonly Likes?: Comment[];
  readonly lastName: string;
  readonly sub: string;
  readonly checked: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}