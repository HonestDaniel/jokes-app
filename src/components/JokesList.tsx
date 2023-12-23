import React, {useEffect} from 'react';
import {fetchJokes} from '../redux/reducers/ActionCreators';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {addToMyJokes, removeFromMyJokes} from "../redux/reducers/jokesSlice";
import './styles.scss'
import {Box, Button, CircularProgress, Popover} from "@mui/material";

const JokesList: React.FC = () => {
    const dispatch = useAppDispatch()
    const {jokes, error, isLoading} = useAppSelector(state => state.jokesReducer);
    const {myJokes} = useAppSelector(state => state.jokesReducer);

    useEffect(() => {
        if (jokes.length === 0) {
            dispatch(fetchJokes());
        }
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button onClick={() => dispatch(fetchJokes())}>Update jokes</Button>
            <Button aria-describedby={id} onClick={handleClick}>
                My Jokes
            </Button>
            {error ? (
                <div>
                    <h1>Error:</h1>
                    <p>{error}</p>
                </div>
            ) : isLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            ) : (
                <ul className='jokes-list'>
                    {jokes.map((joke) => (
                        <li key={joke.id} className='jokes-list__joke'>
                            <h3 className='jokes-list__setup'>{joke.setup}</h3>
                            <p className='jokes-list__punchline'>{joke.punchline}</p>
                            <Button className='jokes-list__button' onClick={() => dispatch(addToMyJokes(joke))}>Add to
                                My Jokes</Button>
                        </li>
                    ))}
                </ul>
            )}
            <div>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <ul>
                        {myJokes.map((joke) => (
                            <li key={joke.id} className='jokes-list__joke'>
                                <h3 className='jokes-list__setup'>{joke.setup}</h3>
                                <p className='jokes-list__punchline'>{joke.punchline}</p>
                                <Button className='jokes-list__button'
                                        onClick={() => dispatch(removeFromMyJokes(joke.id))}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                </Popover>
            </div>
        </div>
    );
};

export default JokesList;
