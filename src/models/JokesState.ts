import {Joke} from "./Joke";

export interface JokesState {
    jokes: Joke[];
    myJokes: Joke[];
    isLoading: boolean;
    error: string;
}