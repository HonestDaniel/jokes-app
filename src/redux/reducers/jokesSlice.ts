import { createSlice } from '@reduxjs/toolkit';
import { Joke } from '../../models/Joke';
import { JokesState } from '../../models/JokesState';
import { fetchJokes } from './ActionCreators';

const initialState: JokesState = {
    jokes: [],
    myJokes: [],
    isLoading: false,
    error: '',
};

const jokesSlice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        addToMyJokes(state, action) {
            const newJoke = action.payload;

            const isIdUnique = !state.myJokes.some(joke => joke.id === newJoke.id);

            if (isIdUnique) {
                state.myJokes.push(newJoke);
            }
        },
        removeFromMyJokes(state, action) {
            state.myJokes = state.myJokes.filter(joke => joke.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJokes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchJokes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = ''
            state.jokes = action.payload;
        });
        builder.addCase(fetchJokes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    },
});

export const { addToMyJokes, removeFromMyJokes } = jokesSlice.actions;

export default jokesSlice.reducer;