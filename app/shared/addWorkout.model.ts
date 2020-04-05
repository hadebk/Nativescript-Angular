import Maybe from "graphql/tsutils/Maybe";

export type TagInput = {
    name?: Maybe<string>,
}

export class Workout{
    name: string;
    description: string;
    tags?: Array<TagInput>;
    userId: number;
    distanceMeters: number 
    durationSeconds: number
}