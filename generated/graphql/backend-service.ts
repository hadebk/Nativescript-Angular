import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
// Generated in 2020-03-15T23:40:30+01:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<User>,
  createWorkout?: Maybe<Workout>,
  deleteWorkout?: Maybe<Scalars['String']>,
};


export type MutationLoginArgs = {
  userName: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateWorkoutArgs = {
  name: Scalars['String'],
  description: Scalars['String'],
  tags?: Maybe<Array<Maybe<TagInput>>>,
  distanceMeters?: Maybe<Scalars['Int']>,
  durationSeconds?: Maybe<Scalars['Int']>,
  userId: Scalars['Int']
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  workout?: Maybe<Workout>,
  workouts?: Maybe<Array<Maybe<Workout>>>,
};


export type QueryWorkoutArgs = {
  id: Scalars['Int']
};

export type Tag = {
   __typename?: 'Tag',
  name?: Maybe<Scalars['String']>,
};

export type TagInput = {
  name?: Maybe<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  userName: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type Workout = {
   __typename?: 'Workout',
  id: Scalars['Int'],
  name: Scalars['String'],
  description: Scalars['String'],
  at?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  tags?: Maybe<Array<Maybe<Tag>>>,
  distanceMeters?: Maybe<Scalars['Int']>,
  durationSeconds?: Maybe<Scalars['Int']>,
};

export type CreateWorkoutMutationVariables = {
  name: Scalars['String'],
  description: Scalars['String'],
  tags?: Maybe<Array<Maybe<TagInput>>>,
  userId: Scalars['Int'],
  distanceMeters: Scalars['Int'],
  durationSeconds: Scalars['Int']
};


export type CreateWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { createWorkout: Maybe<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'id' | 'name' | 'description' | 'distanceMeters' | 'durationSeconds'>
    & { tags: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>>> }
  )> }
);

export type DeleteWorkoutMutationVariables = {
  workoutId: Scalars['Int']
};


export type DeleteWorkoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteWorkout'>
);

export type LoginMutationVariables = {
  userName: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
  )> }
);

export type WorkoutQueryVariables = {
  id: Scalars['Int']
};


export type WorkoutQuery = (
  { __typename?: 'Query' }
  & { workout: Maybe<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'id' | 'name' | 'description' | 'at' | 'distanceMeters' | 'durationSeconds'>
    & { tags: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>>> }
  )> }
);

export type WorkoutsQueryVariables = {};


export type WorkoutsQuery = (
  { __typename?: 'Query' }
  & { workouts: Maybe<Array<Maybe<(
    { __typename?: 'Workout' }
    & Pick<Workout, 'id' | 'name' | 'description' | 'at'>
    & { tags: Maybe<Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>>> }
  )>>> }
);
 
export const CreateWorkoutDocument = gql`
    mutation createWorkout($name: String!, $description: String!, $tags: [TagInput], $distanceMeters: Int, $durationSeconds: Int,$userId: Int!) {
  createWorkout(name: $name, description: $description, tags: $tags, distanceMeters: $distanceMeters, durationSeconds: $durationSeconds,  userId: $userId) {
    id
    name
    description
    tags {
      name
    }
    distanceMeters
    durationSeconds
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateWorkoutGQL extends Apollo.Mutation<CreateWorkoutMutation, CreateWorkoutMutationVariables> {
    document = CreateWorkoutDocument;
    client = 'BackendServiceGraphQLClient';
  }
  //----------------------------------
export const DeleteWorkoutDocument = gql`
    mutation deleteWorkout($workoutId: Int!) {
  deleteWorkout(workoutId: $workoutId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteWorkoutGQL extends Apollo.Mutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables> {
    document = DeleteWorkoutDocument;
    client = 'BackendServiceGraphQLClient';
  }
  //-----------------------------
export const LoginDocument = gql`
    mutation login($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    id
    firstName
    lastName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    client = 'BackendServiceGraphQLClient';
  }
  //-----------------------
export const WorkoutDocument = gql`
    query workout($id: Int!) {
  workout(id: $id) {
    id
    name
    description
    at
    tags {
      name
    }
    distanceMeters
    durationSeconds
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class WorkoutGQL extends Apollo.Query<WorkoutQuery, WorkoutQueryVariables> {
    document = WorkoutDocument;
    client = 'BackendServiceGraphQLClient';
  }
  //------------------------------
export const WorkoutsDocument = 
    gql` query workouts {
      workouts {
        id
        name
        description
        at
        tags {
          name
        }
        distanceMeters
        durationSeconds
      }
    }`;

  @Injectable({
    providedIn: 'root'
  })
  export class WorkoutsGQL extends Apollo.Query<WorkoutsQuery, WorkoutsQueryVariables> {
    document = WorkoutsDocument;
    client = 'BackendServiceGraphQLClient';
  }