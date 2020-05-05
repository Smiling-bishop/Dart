import reducer from './reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

let store;

// if (__DEV__) {
//   const middlewares = [];
//   const createFlipperMiddleware = require('rn-redux-middleware-flipper')
//     .default;
//   middlewares.push(createFlipperMiddleware());
//
//   store = createStore(
//     reducer,
//     {},
//     compose(applyMiddleware.apply({}, middlewares)),
//   );
// } else {
store = createStore(reducer, applyMiddleware(thunkMiddleware));
// }

//config.ENV === "DEV" && persistor.purge(); //easier to do test

export {store};
