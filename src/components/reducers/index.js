import {combineReducers} from 'redux';
import rootReducer from './postsReducer';


export default combineReducers(
    {
        items : rootReducer,
       

    }
);