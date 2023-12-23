import axios from "axios";
import {Joke} from '../../models/Joke';
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchJokes = createAsyncThunk(
    'jokes/fetchAll',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get<Joke[]>('https://official-joke-api.appspot.com/jokes/programming/ten');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)
