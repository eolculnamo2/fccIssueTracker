import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'

//initialize store
const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;