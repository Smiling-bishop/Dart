import {combineReducers} from 'redux';
import game from './reducers/game';

const appReducer = combineReducers({game});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
