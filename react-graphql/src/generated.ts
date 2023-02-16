export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthModel = {
  __typename?: 'AuthModel';
  token: Scalars['String'];
  user: UserModel;
};

export type CreatePhotoDto = {
  category: PhotoCategory;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFakeUsers?: Maybe<Array<UserModel>>;
  gitHubAuth: AuthModel;
  postPhoto: PhotoModel;
};


export type MutationAddFakeUsersArgs = {
  count: Scalars['Float'];
};


export type MutationGitHubAuthArgs = {
  code: Scalars['String'];
};


export type MutationPostPhotoArgs = {
  inputPhoto: CreatePhotoDto;
};

export enum PhotoCategory {
  Action = 'ACTION',
  Graphic = 'GRAPHIC',
  Landscape = 'LANDSCAPE',
  Portrait = 'PORTRAIT',
  Selfie = 'SELFIE'
}

export type PhotoModel = {
  __typename?: 'PhotoModel';
  category: PhotoCategory;
  created: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  postedBy: UserModel;
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPhotos?: Maybe<Array<PhotoModel>>;
  allUsers?: Maybe<Array<UserModel>>;
  me?: Maybe<UserModel>;
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar: Scalars['String'];
  githubLogin: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  postedPhotos: Array<PhotoModel>;
};
