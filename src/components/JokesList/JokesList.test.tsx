import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import JokesList from './JokesList';
import {Provider} from "react-redux";
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import {JokesState} from "../../models/JokesState";

describe('JokesList', () => {
    const initialState = {
        jokesReducer: {
            jokes: [{id: 1, setup: 'Joke Setup', punchline: 'Joke Punchline'}],
            myJokes: [],
            isLoading: false,
            error: '',
        },
    };
    const mockStore = configureStore()
    let store: MockStoreEnhanced<JokesState, {}>;

    test('JokesList renders', () => {
        store = mockStore(initialState) as MockStoreEnhanced<JokesState, {}>;
        render(<Provider store={store}><JokesList/></Provider>);

        expect(screen.getByRole('list')).toBeInTheDocument();
    })
})